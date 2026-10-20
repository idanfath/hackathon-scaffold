<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmailIsNotVerified
{
    /**
     * handle incoming request
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // only proceed if user is not verified
        if (! $user || $user->hasVerifiedEmail()) {
            return redirect()->back()->with('error', 'Email anda sudah diverifikasi.');
        }

        return $next($request);
    }
}
