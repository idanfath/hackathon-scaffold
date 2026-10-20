<?php

namespace App\Enums;

use App\Enums\Concerns\HasValues;

enum NotificationCategory: string
{
    use HasValues;

    case System = 'system';

    public static function defaultValue(): string
    {
        return self::System->value;
    }
}
