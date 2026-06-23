<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResidentRequest;
use App\Models\Resident;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResidentsController extends Controller
{
    public function index(Request $request)
    {
        $query = Resident::query();

        if ($request->input('status') === 'history') {
            $query = Resident::onlyTrashed();
        }

        if ($request->filled('search')) {
            $filter = $request->input('filter', 'name');
            $search = $request->search;

            if ($filter === 'name') {
                $query->where('name', 'like', '%' . $search . '%');
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

        $residents = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Residents/Index', [
            'residents' => $residents,
            'filters' => $request->only('search', 'filter', 'status'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Residents/Create');
    }

    public function store(ResidentRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('photo_path')) {
            $validated['photo_path'] = $request->file('photo_path')->store('residents', 'public');
        }

        Resident::create($validated);

        return redirect()->route('residents.index')->with('success', 'O idoso foi cadastrado com sucesso!');
    }

    public function show(Resident $resident)
    {
        $resident->load('medications');

        return Inertia::render(
            'Residents/Show',
            [
                'resident' => $resident,
            ]
        );
    }

    public function edit(Resident $resident)
    {
        return Inertia::render(
            'Residents/Edit',
            [
                'resident' => $resident,
            ]
        );
    }

    public function update(ResidentRequest $request, Resident $resident)
    {
        $validated = $request->validated();

        if ($request->hasFile('photo_path')) {
            $validated['photo_path'] = $request->file('photo_path')->store('residents', 'public');
        } else {
            unset($validated['photo_path']);
        }

        $resident->update($validated);

        return redirect()->route('residents.show', $resident)->with('success', 'O idoso foi atualizado com sucesso!');
    }

    public function destroy(Resident $resident)
    {
        $resident->delete();

        return redirect()->route('residents.index')->with('success', 'O idoso foi excluído com sucesso!');
    }

    public function restore(Resident $resident)
    {
        $resident->restore();

        return redirect()->route('residents.index', ['status' => 'history'])->with('success', 'O idoso foi restaurado com sucesso!');
    }

    public function forceDelete(Resident $resident)
    {
        $resident->forceDelete();

        return redirect()->route('residents.index', ['status' => 'history'])->with('success', 'O idoso foi excluído definitivamente!');
    }
}
