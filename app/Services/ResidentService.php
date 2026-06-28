<?php

namespace App\Services;

use App\Models\Resident;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

class ResidentService
{
    /**
     * Get paginated and filtered list of residents.
     *
     * @param  array<string, mixed>  $filters
     */
    public function getFilteredResidents(array $filters): LengthAwarePaginator
    {
        $query = Resident::query();

        if (($filters['status'] ?? null) === 'history') {
            $query = Resident::onlyTrashed();
        }

        if (! empty($filters['search'])) {
            $filter = $filters['filter'] ?? 'name';
            $search = $filters['search'];

            if ($filter === 'name') {
                $query->where('name', 'like', '%'.$search.'%');
            } elseif ($filter === 'gender') {
                $query->where('gender', $search);
            } elseif ($filter === 'disease') {
                if (in_array($search, ['is_diabetic', 'is_hypertensive', 'is_epileptic'])) {
                    $query->where($search, true);
                }
            } elseif ($filter === 'dependency_level') {
                $query->where('dependency_level', $search);
            } elseif ($filter === 'age' && is_numeric($search)) {
                $age = (int) $search;
                $today = Carbon::today();
                $maxDate = $today->copy()->subYears($age)->format('Y-m-d');
                $minDate = $today->copy()->subYears($age + 1)->addDay()->format('Y-m-d');

                $query->whereBetween('birth_date', [$minDate, $maxDate]);
            }
        }

        return $query->latest()->paginate(15)->withQueryString();
    }

    /**
     * Create a new resident.
     *
     * @param  array<string, mixed>  $data
     */
    public function createResident(array $data): Resident
    {
        if (isset($data['photo_path']) && $data['photo_path'] instanceof UploadedFile) {
            $data['photo_path'] = $data['photo_path']->store('residents', 'public');
        }

        return Resident::create($data);
    }

    /**
     * Update an existing resident.
     *
     * @param  array<string, mixed>  $data
     */
    public function updateResident(Resident $resident, array $data): bool
    {
        if (isset($data['photo_path']) && $data['photo_path'] instanceof UploadedFile) {
            $data['photo_path'] = $data['photo_path']->store('residents', 'public');
        } else {
            unset($data['photo_path']);
        }

        return $resident->update($data);
    }
}
