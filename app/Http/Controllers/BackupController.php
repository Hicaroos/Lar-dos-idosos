<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use ZipArchive;

class BackupController extends Controller
{
    public function __invoke()
    {

        $oldBackups = File::glob(storage_path('app/backup-lar-dos-idosos-*.zip'));
        if ($oldBackups) {
            foreach ($oldBackups as $oldBackup) {
                File::delete($oldBackup);
            }
        }

        $zipFileName = 'backup-lar-dos-idosos-' . date('Y-m-d-H-i-s') . '.zip';
        $zipFilePath = storage_path('app/' . $zipFileName);
        $zip = new ZipArchive;

        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {


            $possibleDbPaths = [
                config('database.connections.sqlite.database'),
                dirname(storage_path()) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'database.sqlite',
                database_path('database.sqlite')
            ];

            $dbPath = null;
            foreach ($possibleDbPaths as $path) {
                if ($path && File::exists($path) && !is_dir($path)) {
                    $dbPath = $path;
                    break;
                }
            }


            $zip->addFromString('info.txt', "Backup gerado em: " . date('Y-m-d H:i:s'));

            if ($dbPath) {
                $zip->addFile($dbPath, 'database.sqlite');
                if (File::exists($dbPath . '-wal')) {
                    $zip->addFile($dbPath . '-wal', 'database.sqlite-wal');
                }
                if (File::exists($dbPath . '-shm')) {
                    $zip->addFile($dbPath . '-shm', 'database.sqlite-shm');
                }
            }


            $storagePath = storage_path('app/public');
            if (File::exists($storagePath)) {
                $files = File::allFiles($storagePath);
                foreach ($files as $file) {
                    $zip->addFile($file->getRealPath(), 'storage/app/public/' . $file->getRelativePathname());
                }
            }

            $zip->close();

            return response()->download($zipFilePath);
        }

        return back()->with('error', 'Não foi possível criar o arquivo de backup.');
    }
}
