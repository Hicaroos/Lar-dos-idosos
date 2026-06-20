<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medication extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'resident_id',
        'name',
        'time',
        'dose',
        'shift',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}
