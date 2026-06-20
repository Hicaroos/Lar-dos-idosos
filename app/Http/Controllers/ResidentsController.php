<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResidentRequest;
use App\Models\Resident;
use Inertia\Inertia;

class ResidentsController extends Controller
{
    public function index()
    {
        $residents = Resident::latest()->paginate(10);

        return Inertia::render('Residents/Index', ['residents' => $residents]);
    }

    public function create()
    {
        return Inertia::render('Residents/Create');
    }

    public function store(ResidentRequest $request)
    {
        Resident::create($request->validated());

        return redirect()->route('residents.index')->with('success', 'O idoso foi cadastrado com sucesso!');
    }

    public function show(Resident $resident)
    {
        return Inertia::render('Residents/Show',
            [
                'resident' => $resident,
            ]);
    }

    public function edit(Resident $resident)
    {
        return Inertia::render('Residents/Edit',
            [
                'resident' => $resident,
            ]);
    }

    public function update(ResidentRequest $request, Resident $resident)
    {
        $resident->update($request->validated());

        return redirect()->route('residents.show', $resident)->with('success', 'O idoso foi atualizado com sucesso!');
    }

    public function destroy(Resident $resident)
    {
        $resident->delete();

        return redirect()->route('residents.index')->with('success', 'O idoso foi excluído com sucesso!');
    }
}
