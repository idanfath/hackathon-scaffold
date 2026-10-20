<?php

namespace App\Services;

use App\Models\User;
use Carbon\CarbonImmutable;

class HomeService
{
    /**
     * @return array<string, mixed>
     */
    public function for(User $user): array
    {
        $now = CarbonImmutable::now(config('app.timezone'));

        return [
            'account_state' => 'active',
            'viewer_name' => $user->name,
            'role' => $user->role?->value,
            'server_now' => $now->toISOString(),
            'summary' => [],
            'actions' => [],
        ];
    }
}
