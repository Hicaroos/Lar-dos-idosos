<?php

namespace App\Services;

use App\Models\Resident;

class ReportsService
{
    /**
     * Get data for reports.
     *
     * @return array<string, mixed>
     */
    public function getReportsData(): array
    {
        $residents = Resident::orderBy('name')->get();

        $byGender = $residents->groupBy(function ($resident) {
            return $resident->gender ?: 'Não Informado';
        });

        $byDependency = $residents->groupBy(function ($resident) {
            if (! $resident->dependency_level) {
                return 'Não Informado';
            }

            return match ((int) $resident->dependency_level) {
                1 => 'Grau 1 (Independente)',
                2 => 'Grau 2 (Dependência Parcial)',
                3 => 'Grau 3 (Dependência Total)',
                default => 'Grau '.$resident->dependency_level
            };
        });

        $byDisease = [
            'Diabéticos' => $residents->filter->is_diabetic->values(),
            'Hipertensos' => $residents->filter->is_hypertensive->values(),
            'Epilépticos' => $residents->filter->is_epileptic->values(),
            'Nenhuma relatada' => $residents->filter(fn ($r) => !$r->is_diabetic && !$r->is_hypertensive && !$r->is_epileptic)->values(),
        ];

        return [
            'byGender' => $byGender,
            'byDependency' => $byDependency,
            'byDisease' => $byDisease,
        ];
    }
}
