<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'resident_id',
        'title',
        'file_path',
        'file_type',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}
