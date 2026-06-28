<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\MedicationsController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\ResidentsController;
use Illuminate\Support\Facades\Route;

Route::get('login', [AuthController::class, 'showLogin'])->name('login');
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth.password')->group(function () {
    Route::redirect('/', '/residents')->name('home');

Route::post('residents/{resident}/restore', [ResidentsController::class, 'restore'])->name('residents.restore')->withTrashed();
Route::delete('residents/{resident}/force', [ResidentsController::class, 'forceDelete'])->name('residents.forceDelete')->withTrashed();
Route::delete('residents/{resident}/photo', [ResidentsController::class, 'destroyPhoto'])->name('residents.photo.destroy');

Route::resource('residents', ResidentsController::class)->withTrashed();
Route::get('residents/{resident}/medications', [MedicationsController::class, 'index'])->name('residents.medications.index')->withTrashed();
Route::resource('residents.medications', MedicationsController::class)->shallow()->except(['index']);
Route::resource('documents', DocumentsController::class);

Route::get('reports', [ReportsController::class, 'index'])->name('reports.index');

Route::get('uploads/{path}', function ($path) {
    $absolutePath = storage_path('app/public/' . $path);
    if (!file_exists($absolutePath)) {
        abort(404);
    }
    
    $mimeType = mime_content_type($absolutePath);
    return response()->file($absolutePath, [
        'Content-Type' => $mimeType,
        'Cache-Control' => 'public, max-age=86400'
    ]);
})->where('path', '.*')->name('uploads.serve');
});
