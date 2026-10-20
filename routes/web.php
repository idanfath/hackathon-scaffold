<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1')->name('login.submit');
    Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
    Route::get('/password/forgot', [AuthController::class, 'showForgotForm'])->name('password.forgot');
    Route::post('/password/forgot', [AuthController::class, 'submitForgot'])->name('password.forgot.submit')->middleware('throttle:2,1');
    Route::get('/password/reset/{token}', [AuthController::class, 'showResetForm'])->name('password.reset');
    Route::post('/password/reset', [AuthController::class, 'submitReset'])->name('password.reset.submit')->middleware('throttle:3,1');
    Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle'])->name('auth.google.redirect');
    Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
});

Route::get('/email/verify/{user}', [AuthController::class, 'verify'])->middleware(['signed', 'throttle:2,1'])->name('verification.verify');

Route::middleware(['auth'])->group(function () {
    Route::get('/email/verify/notice/{user}', [AuthController::class, 'showVerificationNotice'])->name('verification.notice')->middleware(['signed', 'unverified']);
    Route::post('/email/verify/resend', [AuthController::class, 'resendVerification'])->name('verification.send')->middleware(['throttle:1,1', 'unverified']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware(['auth', 'verified'])
    ->prefix('app')
    ->name('app.')
    ->group(function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
        Route::get('/user', [AppController::class, 'user'])->name('user');

        Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');

        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications');
        Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead'])->name('notifications.read-all');
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markRead'])->name('notifications.read');
        Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');

        Route::get('/account', [AccountController::class, 'index'])->name('account');
        Route::put('/account/password', [AccountController::class, 'updatePassword'])
            ->middleware('throttle:6,1')
            ->name('account.password');
    });
