<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resident extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'registration_number',
        'admission_date',
        'photo_path',
        'name',
        'gender',
        'birth_date',
        'father_name',
        'mother_name',
        'blood_type',
        'naturalness',
        'religion',
        'phone_numbers',
        'zip_code',
        'address',
        'address_number',
        'neighborhood',
        'city',
        'state',
        'reference_point',
        'rg',
        'rg_ssp',
        'rg_emission',
        'cpf',
        'birth_certificate',
        'birth_certificate_lv',
        'birth_certificate_leaves',
        'professional_card',
        'professional_card_series',
        'cns',
        'sus_card',
        'dependency_level',
        'is_diabetic',
        'is_hypertensive',
        'is_epileptic',
        'amenities',
    ];

    public function medications()
    {
        return $this->hasMany(Medication::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
