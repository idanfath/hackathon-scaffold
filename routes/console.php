<?php

// Artisan::command('user:ban {email}', function ($email) {
//     $admin = User::query()->where('role', 'admin')->inRandomOrder()->first();
//     $user = User::query()->where('email', $email)->first();
//     if (! $user) {
//         $this->error("No user found with email: {$email}");

//         return;
//     }
//     app(BanService::class)->ban($user, $admin, 'Banned via console command');
//     $this->info("User banned successfully: {$email}");
// })->purpose('Ban a user by email');

// Artisan::command('user:unban {email}', function ($email) {
//     $admin = User::query()->where('role', 'admin')->inRandomOrder()->first();
//     $user = User::query()->where('email', $email)->first();
//     if (! $user) {
//         $this->error("No user found with email: {$email}");

//         return;
//     }
//     app(BanService::class)->unban($user, $admin);
//     $this->info("User unbanned successfully: {$email}");
// })->purpose('Unban a user by email');

// Artisan::command('user:verify {email}', function ($email) {
//     $user = User::query()->where('email', $email)->first();
//     if (! $user) {
//         $this->error("No user found with email: {$email}");

//         return;
//     }
//     $user->markEmailAsVerified();
//     $this->info("User verified successfully: {$email}");
// })->purpose('Mark a user as email verified by email');

// Artisan::command('user:unverify {email}', function ($email) {
//     $user = User::query()->where('email', $email)->first();
//     if (! $user) {
//         $this->error("No user found with email: {$email}");

//         return;
//     }
//     $user->email_verified_at = null;
//     $user->save();
//     $this->info("User unverified successfully: {$email}");
// })->purpose('Mark a user as email unverified by email');

// // remove role from user
// Artisan::command('role:remove {email}', function ($email) {
//     $user = User::query()->where('email', $email)->first();
//     if (! $user) {
//         $this->error("No user found with email: {$email}");

//         return;
//     }
//     $user->role = null;
//     $user->save();
//     $this->info("Role removed from user successfully: {$email}");
// })->purpose('Remove role from a user by email');
