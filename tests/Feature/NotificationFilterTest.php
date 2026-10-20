<?php

use App\Enums\NotificationCategory;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(LazilyRefreshDatabase::class);

function notificationFor(User $user, NotificationCategory $category, string $title = 'Aktivitas Baru'): Notification
{
    $notification = Notification::query()->create([
        'title' => $title,
        'body' => 'Isi notifikasi.',
        'category' => $category,
    ]);
    $notification->recipients()->create(['user_id' => $user->id]);

    return $notification;
}

test('notification inbox filters system activity', function () {
    $user = User::factory()->create();
    $system = notificationFor($user, NotificationCategory::System, 'Aktivitas Sistem');

    $this->actingAs($user)
        ->get(route('app.notifications', ['category' => NotificationCategory::System->value]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('app/notifications')
            ->where('filters.category', NotificationCategory::System->value)
            ->has('inbox.data', 1)
            ->where('inbox.data.0.id', $system->id)
            ->where('inbox.data.0.category', NotificationCategory::System->value));
});
