<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use ZipArchive;

class BackupController extends Controller
{
    public function __invoke()
    {
        $zipFileName = 'backup-lar-dos-idosos-' . date('Y-m-d-H-i-s') . '.zip';
        $zipFilePath = storage_path('app/' . $zipFileName);
        $zip = new ZipArchive;

        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {

            $dbPath = database_path('database.sqlite');
            if (File::exists($dbPath)) {
                $zip->addFile($dbPath, 'database.sqlite');
            }
            if (File::exists($dbPath . '-wal')) {
                $zip->addFile($dbPath . '-wal', 'database.sqlite-wal');
            }
            if (File::exists($dbPath . '-shm')) {
                $zip->addFile($dbPath . '-shm', 'database.sqlite-shm');
            }


            $storagePath = storage_path('app/public');
            if (File::exists($storagePath)) {
                $files = File::allFiles($storagePath);
                foreach ($files as $file) {
                    $zip->addFile($file->getRealPath(), 'storage/app/public/' . $file->getRelativePathname());
                }
            }

            $zip->close();

            return response()->download($zipFilePath)->deleteFileAfterSend(true);
        }

        return back()->with('error', 'Não foi possível criar o arquivo de backup.');
    }
}
