<?php

namespace App\Http\Controllers;

use App\Http\Requests\DocumentRequest;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentsController extends Controller
{
    public function index()
    {
        $documents = Document::latest()->get();

        return Inertia::render('Documents/Index', ['documents' => $documents]);
    }

    public function create()
    {
        return Inertia::render('Documents/Create');
    }

    public function store(DocumentRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('file_path')) {
            $file = $request->file('file_path');
            $validated['file_path'] = $file->store('documents', 'public');
            $validated['file_type'] = $file->getClientOriginalExtension();
        }

        Document::create($validated);

        return redirect()->back()->with('success', 'O documento foi anexado com sucesso!');
    }

    public function show(Document $document)
    {
        return Inertia::render('Documents/Show',
            [
                'document' => $document,
            ]);
    }

    public function edit(Document $document)
    {
        return Inertia::render('Documents/Edit',
            [
                'document' => $document,
            ]);
    }

    public function update(DocumentRequest $request, Document $document)
    {
        $document->update($request->validated());

        return redirect()->route('documents.index')->with('success', 'O documento foi atualizado com sucesso!');
    }

    public function destroy(Document $document)
    {
        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->back()->with('success', 'O documento foi excluído com sucesso!');
    }
}
