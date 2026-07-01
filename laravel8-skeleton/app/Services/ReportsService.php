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

            switch ((int) $resident->dependency_level) {
                case 1: return 'Grau 1 (Independente)';
                case 2: return 'Grau 2 (Dependência Parcial)';
                case 3: return 'Grau 3 (Dependência Total)';
                default: return 'Grau '.$resident->dependency_level;
            }
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
