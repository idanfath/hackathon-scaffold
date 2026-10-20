<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

final class UserAvatarService
{
    public function __construct(
        private ImageCompressionService $compressionService
    ) {}

    public function upload(User $user, UploadedFile $file): string
    {
        $content = file_get_contents($file->getRealPath());

        if ($content === false || $content === '') {
            throw new RuntimeException('Failed to read uploaded avatar.');
        }

        return $this->storeAvatarBytes($user, $content);
    }

    public function importFromUrl(User $user, string $url): ?string
    {
        try {
            $response = Http::timeout(5)
                ->connectTimeout(3)
                ->withHeaders(['Accept' => 'image/*'])
                ->get($url);

            if (! $response->successful()) {
                return null;
            }

            $content = $response->body();
            $maxBytes = 5 * 1024 * 1024;

            if ($content === '' || strlen($content) > $maxBytes) {
                return null;
            }

            $contentType = strtolower((string) $response->header('Content-Type'));

            if ($contentType !== '' && ! str_starts_with($contentType, 'image/')) {
                return null;
            }

            return $this->storeAvatarBytes($user, $content);
        } catch (\Throwable $e) {
            Log::warning('Avatar pull from URL failed', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
            ]);

            return null;
        }
    }

    public function remove(User $user): void
    {
        if ($user->avatar === null) {
            return;
        }

        $avatar = $user->avatar;

        $user->avatar = null;
        $user->save();

        $this->deleteAvatarAfterCommit($avatar);
    }

    private function storeAvatarBytes(User $user, string $content): string
    {
        $content = $this->compressionService->compressProfile($content, 'profile_picture');

        $path = 'avatars/'.uniqid().'.jpg';
        if (! Storage::disk('s3')->put($path, $content, 'public')) {
            throw new RuntimeException('Failed to store avatar.');
        }

        $oldAvatar = $user->avatar;

        try {
            $user->avatar = $path;
            $user->save();
        } catch (\Throwable $exception) {
            Storage::disk('s3')->delete($path);

            throw $exception;
        }

        if ($oldAvatar !== null) {
            $this->deleteAvatarAfterCommit($oldAvatar);
        }

        return $path;
    }

    private function deleteAvatarAfterCommit(string $avatar): void
    {
        if (DB::transactionLevel() > 0) {
            DB::afterCommit(fn () => Storage::disk('s3')->delete($avatar));

            return;
        }

        Storage::disk('s3')->delete($avatar);
    }
}
