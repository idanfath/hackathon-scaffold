<?php

namespace App\Models;

use App\Enums\UserRole;
use App\Services\AuthMailService;
use Database\Factories\UserFactory;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

#[Guarded(['id'])]
#[Appends(['avatar_url'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;

    use MustVerifyEmailTrait;
    use Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date',
            'role' => UserRole::class,
            'is_banned' => 'boolean',
        ];
    }

    /**
     * get the avatar url attribute
     */
    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->avatar ? Storage::disk('s3')->url($this->avatar) : null
        );
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function notificationRecipients()
    {
        return $this->hasMany(NotificationRecipient::class);
    }

    public function sendEmailVerificationNotification(): void
    {
        app(AuthMailService::class)->sendVerification($this);
    }

    public function sendPasswordResetNotification($token): void
    {
        app(AuthMailService::class)->sendPasswordReset($this, $token);
    }
}
