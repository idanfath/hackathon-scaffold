<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('active user can access authenticated route', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('app.home'))
        ->assertOk();
});

test('banned user accessing app route receives 403 error page with custom message', function () {
    $user = User::factory()->banned()->create();

    $this->actingAs($user)
        ->get(route('app.home'))
        ->assertForbidden()
        ->assertInertia(fn (Assert $page) => $page
            ->component('errorPage')
            ->where('status', 403)
            ->where('message', 'Akun Anda telah dinonaktifkan.')
        );
});

test('banned user can log out successfully', function () {
    $user = User::factory()->banned()->create();

    $this->actingAs($user)
        ->post(route('logout'))
        ->assertRedirect(route('home'));

    $this->assertGuest();
});

test('banned user cannot log in and receives error flash message', function () {
    $user = User::factory()->banned()->create([
        'email' => 'banned@example.com',
        'password' => 'secret123',
    ]);

    $this->from(route('login'))
        ->post(route('login.submit'), [
            'email' => 'banned@example.com',
            'password' => 'secret123',
        ])
        ->assertRedirect(route('login'))
        ->assertSessionHas('error', 'Akun Anda telah dinonaktifkan.');

    $this->assertGuest();
});

test('guest can access public routes without ensure not banned interference', function () {
    $this->get(route('login'))
        ->assertOk();
});
