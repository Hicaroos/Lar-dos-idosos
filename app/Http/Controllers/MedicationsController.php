<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedicationRequest;
use App\Models\Medication;
use Inertia\Inertia;
use App\Models\Resident;

class MedicationsController extends Controller
{
    public function index(Resident $resident)
    {
        $resident->load('medications');

        return Inertia::render('Medications/Index', ['resident' => $resident]);
    }

    public function store(MedicationRequest $request, Resident $resident)
    {
        $resident->medications()->create($request->validated());

        return back()->with('success', 'Medicamento adicionado com sucesso!');
    }

    public function update(MedicationRequest $request, Medication $medication)
    {
        $medication->update($request->validated());

        return back()->with('success', 'Medicamento atualizado com sucesso!');
    }

    public function destroy(Medication $medication)
    {
        $medication->delete();

        return back()->with('success', 'Medicamento excluído com sucesso!');
    }
}
