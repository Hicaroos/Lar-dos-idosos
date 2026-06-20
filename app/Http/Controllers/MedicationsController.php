<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedicationRequest;
use App\Models\Medication;
use Inertia\Inertia;

class MedicationsController extends Controller
{
    public function index()
    {
        $medications = Medication::latest()->get();

        return Inertia::render('Medications/Index', ['medications' => $medications]);
    }

    public function create()
    {

        return Inertia::render('Medications/Create');
    }

    public function store(MedicationRequest $request)
    {
        Medication::create($request->validated());

        return redirect()->route('medications.index')->with('success', 'O medicamento foi criado com sucesso!');
    }

    public function show(Medication $medication)
    {
        return Inertia::render('Medications/Show',
            [
                'medication' => $medication,
            ]);
    }

    public function edit(Medication $medication)
    {
        return Inertia::render('Medications/Edit',
            [
                'medication' => $medication,
            ]);
    }

    public function update(MedicationRequest $request, Medication $medication)
    {
        $medication->update($request->validated());

        return redirect()->route('medications.show', $medication)->with('success', 'O medicamento foi atualizado com sucesso!');
    }

    public function destroy(Medication $medication)
    {
        $medication->delete();

        return redirect()->route('medications.index')->with('success', 'O medicamento foi excluído com sucesso!');
    }
}
