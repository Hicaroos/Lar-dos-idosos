<?php

use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\MedicationsController;
use App\Http\Controllers\ResidentsController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');

Route::resource('residents', ResidentsController::class);
Route::resource('residents.medications', MedicationsController::class)->shallow();
Route::resource('documents', DocumentsController::class);
