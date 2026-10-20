<?php

use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(LazilyRefreshDatabase::class);

test('authenticated user can view clean dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('app.home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('app/home')
            ->where('home.account_state', 'active')
            ->where('home.viewer_name', $user->name));
});
