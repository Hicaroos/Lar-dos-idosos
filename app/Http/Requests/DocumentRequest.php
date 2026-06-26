<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'resident_id' => ['required', 'exists:residents,id'],
            'title' => ['required', 'string', 'max:255'],
            'file_path' => ['required', 'file', 'max:10240'], // 10MB max
            'file_type' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'resident_id.required' => 'O idoso é obrigatório.',
            'resident_id.exists' => 'O idoso selecionado não foi encontrado.',
            'title.required' => 'O título do documento é obrigatório.',
            'file_path.required' => 'O arquivo é obrigatório.',
            'string' => 'O campo :attribute deve ser um texto.',
            'max' => 'O campo :attribute não pode ter mais de :max caracteres.',
        ];
    }

    public function attributes(): array
    {
        return [
            'resident_id' => 'idoso',
            'title' => 'título',
            'file_path' => 'arquivo',
            'file_type' => 'tipo de arquivo',
        ];
    }
}
