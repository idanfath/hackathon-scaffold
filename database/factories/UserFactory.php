<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'role' => UserRole::defaultValue(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'is_banned' => false,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the user has no password (e.g. Google-only).
     */
    public function withoutPassword(): static
    {
        return $this->state(fn (array $attributes) => [
            'password' => null,
        ]);
    }

    public function user(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::User,
        ]);
    }

    public function admin(): static
    {
        return $this->state(fn (): array => [
            'role' => UserRole::Admin,
        ]);
    }

    public function onboarded(): static
    {
        return $this->state(fn (): array => [
            'date_of_birth' => fake()->dateTimeBetween('-55 years', '-18 years')->format('Y-m-d'),
        ]);
    }

    public function banned(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_banned' => true,
        ]);
    }
}
