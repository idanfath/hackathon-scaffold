<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use function fake;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        fake()->seed(20260729);

        $users = [
            ['name' => 'Dewi Anggraini', 'email' => 'admin@example.com', 'role' => UserRole::Admin],
            ['name' => 'Raka Saputra', 'email' => 'user@example.com', 'role' => UserRole::User],
            ['name' => 'Nadia Pratama', 'email' => 'user2@example.com', 'role' => UserRole::User],
            ['name' => 'Budi Santoso', 'email' => 'dummy.user1@example.com', 'role' => UserRole::User],
            ['name' => 'Siti Rahmawati', 'email' => 'dummy.user2@example.com', 'role' => UserRole::User],
            ['name' => 'Dedi Kurniawan', 'email' => 'dummy.user3@example.com', 'role' => UserRole::User],
            ['name' => 'Maya Putri', 'email' => 'dummy.user4@example.com', 'role' => UserRole::User],
            ['name' => 'Andi Wijaya', 'email' => 'dummy.user5@example.com', 'role' => UserRole::User],
            ['name' => 'Rina Kusuma', 'email' => 'dummy.user6@example.com', 'role' => UserRole::User],
        ];

        foreach ($users as $user) {
            User::query()->updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'role' => $user['role'],
                    'avatar' => $user['avatar'] ?? null,
                    'date_of_birth' => fake()->dateTimeBetween('-52 years', '-20 years')->format('Y-m-d'),
                    'email_verified_at' => now(),
                    'password' => Hash::make('password'),
                ],
            );
        }

        $this->command->info('Seeded users: '.count($users));
    }
}
