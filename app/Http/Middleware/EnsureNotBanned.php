<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureNotBanned
{
    /**
     * handle incoming request
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user !== null && $user->is_banned && ! $request->routeIs('logout')) {
            abort(403, 'Akun Anda telah dinonaktifkan.');
        }

        return $next($request);
    }
}
