<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResidentRequest;
use App\Models\Resident;
use App\Services\ResidentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResidentsController extends Controller
{
    public function __construct(public ResidentService $residentService) {}

    public function index(Request $request): Response
    {
        $filters = $request->only('search', 'filter', 'status');
        $residents = $this->residentService->getFilteredResidents($filters);

        return Inertia::render('Residents/Index', [
            'residents' => $residents,
            'filters' => $filters,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Residents/Create');
    }

    public function store(ResidentRequest $request): RedirectResponse
    {
        $this->residentService->createResident($request->validated());

        return redirect()->route('residents.index')->with('success', 'O idoso foi cadastrado com sucesso!');
    }

    public function show(Resident $resident): Response
    {
        $resident->load(['medications', 'documents']);

        return Inertia::render(
            'Residents/Show',
            [
                'resident' => $resident,
            ]
        );
    }

    public function edit(Resident $resident): Response
    {
        return Inertia::render(
            'Residents/Edit',
            [
                'resident' => $resident,
            ]
        );
    }

    public function update(ResidentRequest $request, Resident $resident): RedirectResponse
    {
        $this->residentService->updateResident($resident, $request->validated());

        return redirect()->route('residents.show', $resident)->with('success', 'O idoso foi atualizado com sucesso!');
    }

    public function destroy(Resident $resident): RedirectResponse
    {
        $resident->delete();

        return redirect()->route('residents.index')->with('success', 'O idoso foi excluído com sucesso!');
    }

    public function restore(Resident $resident): RedirectResponse
    {
        $resident->restore();

        return redirect()->route('residents.index', ['status' => 'history'])->with('success', 'O idoso foi restaurado com sucesso!');
    }

    public function forceDelete(Resident $resident): RedirectResponse
    {
        $resident->forceDelete();

        return redirect()->route('residents.index', ['status' => 'history'])->with('success', 'O idoso foi excluído definitivamente!');
    }
}
