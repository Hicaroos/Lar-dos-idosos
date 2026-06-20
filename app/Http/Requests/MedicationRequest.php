<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MedicationRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'time' => ['required', 'string', 'max:255'],
            'dose' => ['required', 'string', 'max:255'],
            'shift' => ['required', 'string', 'in:manha,tarde,noite'],
        ];
    }

    public function messages(): array
    {
        return [
            'resident_id.required' => 'O idoso é obrigatório.',
            'resident_id.exists' => 'O idoso selecionado não foi encontrado.',
            'name.required' => 'O nome do medicamento é obrigatório.',
            'time.required' => 'O horário é obrigatório.',
            'dose.required' => 'A dosagem é obrigatória.',
            'shift.required' => 'O turno é obrigatório.',
            'shift.in' => 'O turno deve ser manha, tarde ou noite.',
            'string' => 'O campo :attribute deve ser um texto.',
            'max' => 'O campo :attribute não pode ter mais de :max caracteres.',
        ];
    }

    public function attributes(): array
    {
        return [
            'resident_id' => 'idoso',
            'name' => 'nome do medicamento',
            'time' => 'horário',
            'dose' => 'dosagem',
            'shift' => 'turno',
        ];
    }
}
