<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

enum UserRole: string
{
    use HasValues;

    case User = 'user';
    case Admin = 'admin';

    public static function defaultValue(): string
    {
        return self::User->value;
    }

    public static function selectable(): array
    {
        return [
            self::User,
        ];
    }
}
