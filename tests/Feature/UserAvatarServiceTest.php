<?php

use App\Models\User;
use App\Services\ImageCompressionService;
use App\Services\UserAvatarService;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(LazilyRefreshDatabase::class);

test('user avatar upload always processes through ImageCompressionService profile without threshold', function () {
    Storage::fake('s3');

    $compressionService = Mockery::mock(ImageCompressionService::class);
    $compressionService->shouldReceive('compressProfile')
        ->once()
        ->with(Mockery::type('string'), 'profile_picture')
        ->andReturn('compressed_fake_image_bytes');

    $avatarService = new UserAvatarService($compressionService);
    $user = User::factory()->create();

    $file = UploadedFile::fake()->createWithContent('avatar.png', 'fake_png_image_binary_data');

    $path = $avatarService->upload($user, $file);

    expect($path)->toStartWith('avatars/')
        ->and($user->fresh()->avatar)->toBe($path);

    Storage::disk('s3')->assertExists($path);
});

test('user avatar url returns null when user has no avatar', function () {
    $user = User::factory()->create(['avatar' => null]);

    expect($user->avatar_url)->toBeNull();
});

test('user avatar url returns storage s3 url when user has avatar', function () {
    Storage::fake('s3');

    $user = User::factory()->create(['avatar' => 'avatars/sample.webp']);

    expect($user->avatar_url)->toBe(Storage::disk('s3')->url('avatars/sample.webp'));
});
