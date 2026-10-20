<?php

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

test('user seeder is repeatable and creates deterministic verified accounts', function () {
    $this->seed(UserSeeder::class);
    $this->seed(UserSeeder::class);

    $emails = [
        'admin@example.com',
        'user@example.com',
        'user2@example.com',
        'dummy.user1@example.com',
        'dummy.user2@example.com',
        'dummy.user3@example.com',
        'dummy.user4@example.com',
        'dummy.user5@example.com',
        'dummy.user6@example.com',
    ];

    expect(User::query()->whereIn('email', $emails)->count())->toBe(9)
        ->and(User::query()->whereIn('email', $emails)->distinct('email')->count('email'))->toBe(9);

    foreach ([
        'admin@example.com' => UserRole::Admin,
        'user@example.com' => UserRole::User,
        'user2@example.com' => UserRole::User,
    ] as $email => $role) {
        $user = User::query()->where('email', $email)->firstOrFail();

        expect($user->role)->toBe($role)
            ->and($user->email_verified_at)->not->toBeNull()
            ->and(Hash::check('password', $user->password))->toBeTrue();
    }
});
