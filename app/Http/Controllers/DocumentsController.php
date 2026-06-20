<?php

namespace App\Http\Controllers;

use App\Http\Requests\DocumentRequest;
use App\Models\Document;
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
        Document::create($request->validated());

        return redirect()->route('documents.index')->with('success', 'O documento foi criado com sucesso!');
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
        $document->delete();

        return redirect()->route('documents.index')->with('success', 'O documento foi excluído com sucesso!');
    }
}
