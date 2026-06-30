<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use ZipArchive;

class AutoBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:auto-backup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically create a backup if one for today does not exist.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = date('Y-m-d');

        $documentsPath = getenv('USERPROFILE') . DIRECTORY_SEPARATOR . 'Documents' . DIRECTORY_SEPARATOR . 'Backups-Lar-dos-Idosos';


        if (!File::exists($documentsPath)) {
            File::makeDirectory($documentsPath, 0755, true);
        }

        $existingBackups = File::files($documentsPath);
        foreach ($existingBackups as $backup) {
            if (strpos($backup->getFilename(), 'backup-lar-dos-idosos-' . $today) !== false) {
                $this->info("Backup for today ({$today}) already exists.");
                return;
            }
        }


        $zipFileName = 'backup-lar-dos-idosos-' . date('Y-m-d-H-i-s') . '.zip';
        $zipFilePath = $documentsPath . DIRECTORY_SEPARATOR . $zipFileName;
        
        $zip = new ZipArchive;
        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            
            $dbPath = config('database.connections.sqlite.database');
            if ($dbPath && File::exists($dbPath)) {
                $zip->addFile($dbPath, 'database.sqlite');
            }
            if ($dbPath && File::exists($dbPath . '-wal')) {
                $zip->addFile($dbPath . '-wal', 'database.sqlite-wal');
            }
            if ($dbPath && File::exists($dbPath . '-shm')) {
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
            $this->info("Backup created successfully at {$zipFilePath}");
        } else {
            $this->error("Failed to create zip file at {$zipFilePath}");
        }
    }
}
