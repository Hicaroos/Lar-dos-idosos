<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        $user = User::first();
        $isFirstTime = ! $user || empty($user->password);

        return Inertia::render('Auth/Login', [
            'isFirstTime' => $isFirstTime,
        ]);
    }

    public function login(Request $request)
    {
        $user = User::first();
        $isFirstTime = ! $user || empty($user->password);

        if ($isFirstTime) {
            $request->validate([
                'password' => 'required|string|min:4|confirmed',
            ]);

            if (! $user) {
                $user = User::create([
                    'name' => 'Admin',
                    'email' => 'admin@admin.com',
                    'password' => Hash::make($request->password),
                ]);
            } else {
                $user->password = Hash::make($request->password);
                $user->save();
            }

            session(['authenticated' => true]);

            return redirect()->route('home')->with('success', 'Senha configurada e login efetuado com sucesso!');
        }

        $request->validate([
            'password' => 'required|string',
        ]);

        if (Hash::check($request->password, $user->password)) {
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

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:4|confirmed',
        ]);

        $user = User::first();

        if (! $user || ! Hash::check($request->current_password, $user->password)) {
            return back()->withErrors([
                'current_password' => 'A senha atual está incorreta.',
            ]);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return back()->with('success', 'Senha alterada com sucesso!');
    }
}
