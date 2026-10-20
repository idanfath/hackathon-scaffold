<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use App\Services\UserAvatarService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        return $this->renderProfile($request->user(), $request->user());
    }

    public function show(Request $request, User $user): Response
    {
        $this->authorize('view', $user);

        return $this->renderProfile($user, $request->user());
    }

    public function update(UpdateProfileRequest $request, UserAvatarService $avatarService)
    {
        $validated = $request->validated();
        $user = $request->user();

        $newAvatar = null;

        try {
            DB::transaction(function () use ($request, $user, $validated, $avatarService, &$newAvatar): void {
                $user->update(Arr::only($validated, ['name', 'date_of_birth']));

                if ($request->hasFile('avatar')) {
                    $newAvatar = $avatarService->upload($user, $request->file('avatar'));
                } elseif ($request->boolean('remove_avatar')) {
                    $avatarService->remove($user);
                }
            });
        } catch (\Throwable $exception) {
            if ($newAvatar !== null) {
                Storage::disk('s3')->delete($newAvatar);
            }

            throw $exception;
        }

        return to_route('app.profile')->with('success', 'Profil berhasil diperbarui.');
    }

    private function renderProfile(User $profile, User $viewer): Response
    {
        $isOwner = $profile->is($viewer);

        $profileData = [
            'id' => $profile->id,
            'name' => $profile->name,
            'avatar_url' => $profile->avatar_url,
        ];

        if ($isOwner) {
            $profileData = [
                ...$profileData,
                'email' => $profile->email,
                'date_of_birth' => $profile->date_of_birth?->toDateString(),
            ];
        }

        return inertia('app/user/profile', [
            'profile' => $profileData,
            'is_owner' => $isOwner,
            'has_custom_avatar' => $isOwner && $profile->avatar !== null,
            'max_date_of_birth' => $isOwner ? now('Asia/Jakarta')->subYears(18)->toDateString() : null,
        ]);
    }
}
