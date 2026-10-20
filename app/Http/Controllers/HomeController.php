<?php

namespace App\Http\Controllers;

use App\Services\HomeService;
use Illuminate\Http\Request;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(
        Request $request,
        HomeService $home,
    ): Response {
        return inertia('app/home', [
            'home' => fn (): array => $home->for($request->user()),
        ]);
    }
}
