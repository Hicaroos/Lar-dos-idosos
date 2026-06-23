<?php

use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\MedicationsController;
use App\Http\Controllers\ResidentsController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');

Route::post('residents/{resident}/restore', [ResidentsController::class, 'restore'])->name('residents.restore')->withTrashed();
Route::delete('residents/{resident}/force', [ResidentsController::class, 'forceDelete'])->name('residents.forceDelete')->withTrashed();

Route::resource('residents', ResidentsController::class)->withTrashed();
Route::get('residents/{resident}/medications', [MedicationsController::class, 'index'])->name('residents.medications.index')->withTrashed();
Route::resource('residents.medications', MedicationsController::class)->shallow()->except(['index']);
Route::resource('documents', DocumentsController::class);
