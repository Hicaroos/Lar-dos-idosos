<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $systemPassword = env('SYSTEM_PASSWORD');

        if ($request->password === $systemPassword) {
            session(['authenticated' => true]);
            return redirect()->route('home');
        }

        return back()->withErrors(['password' => 'Senha incorreta.']);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('authenticated');
        return redirect()->route('login');
    }
}
