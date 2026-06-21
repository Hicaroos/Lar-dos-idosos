<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ResidentRequest extends FormRequest
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
            'registration_number' => ['required', 'string', 'max:255'],
            'admission_date' => ['required', 'date', 'before_or_equal:today'],
            'photo_path' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string'],
            'birth_date' => ['required', 'date', 'before_or_equal:today'],
            'parentage' => ['nullable', 'string', 'max:255'],
            'naturalness' => ['nullable', 'string', 'max:255'],
            'religion' => ['nullable', 'string', 'max:255'],
            'phone_numbers' => ['nullable', 'string', 'max:255'],
            'zip_code' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:255'],
            'address_number' => ['nullable', 'string', 'max:50'],
            'neighborhood' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'size:2'],
            'reference_point' => ['nullable', 'string', 'max:255'],
            'rg' => ['nullable', 'string', 'max:50'],
            'rg_ssp' => ['nullable', 'string', 'max:50'],
            'rg_emission' => ['nullable', 'date', 'before_or_equal:today'],
            'cpf' => ['nullable', 'string', 'max:20'],
            'birth_certificate' => ['nullable', 'string', 'max:255'],
            'birth_certificate_lv' => ['nullable', 'string', 'max:255'],
            'birth_certificate_leaves' => ['nullable', 'string', 'max:255'],
            'professional_card' => ['nullable', 'string', 'max:255'],
            'professional_card_series' => ['nullable', 'string', 'max:255'],
            'cns' => ['nullable', 'string', 'max:255'],
            'sus_card' => ['nullable', 'string', 'max:255'],
            'dependency_level' => ['required', 'integer', 'in:1,2,3'],
            'is_diabetic' => ['boolean'],
            'is_hypertensive' => ['boolean'],
            'is_epileptic' => ['boolean'],
            'amenities' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'registration_number.required' => 'O número do prontuário é obrigatório.',
            'admission_date.required' => 'A data de admissão é obrigatória.',
            'admission_date.date' => 'A data de admissão deve ser uma data válida.',
            'photo_path.image' => 'A foto deve ser uma imagem válida.',
            'photo_path.mimes' => 'A foto deve ser do tipo JPEG, PNG ou WEBP.',
            'photo_path.max' => 'A foto não pode ter mais de 5MB.',
            'name.required' => 'O nome completo é obrigatório.',
            'gender.required' => 'O sexo é obrigatório.',
            'birth_date.required' => 'A data de nascimento é obrigatória.',
            'birth_date.date' => 'A data de nascimento deve ser uma data válida.',
            'dependency_level.required' => 'O grau de dependência é obrigatório.',
            'dependency_level.integer' => 'O grau de dependência deve ser um número inteiro.',
            'dependency_level.in' => 'O grau de dependência deve ser 1, 2 ou 3.',
            'required' => 'O campo :attribute é obrigatório.',
            'string' => 'O campo :attribute deve ser um texto.',
            'date' => 'O campo :attribute deve ser uma data válida.',
            'max' => 'O campo :attribute não pode ter mais de :max caracteres.',
            'boolean' => 'O campo :attribute deve ser verdadeiro ou falso.',
            'size' => 'O campo :attribute deve ter exatamente :size caracteres.',
            'before_or_equal' => 'O campo :attribute não pode ser uma data futura.',
        ];
    }

    public function attributes(): array
    {
        return [
            'registration_number' => 'número do prontuário',
            'admission_date' => 'data de admissão',
            'photo_path' => 'foto',
            'name' => 'nome completo',
            'gender' => 'sexo',
            'birth_date' => 'data de nascimento',
            'parentage' => 'filiação',
            'naturalness' => 'naturalidade',
            'religion' => 'religião',
            'phone_numbers' => 'telefones de contato',
            'zip_code' => 'CEP',
            'address' => 'endereço',
            'address_number' => 'número do endereço',
            'neighborhood' => 'bairro',
            'city' => 'cidade',
            'state' => 'estado (UF)',
            'reference_point' => 'ponto de referência',
            'rg' => 'RG',
            'rg_ssp' => 'órgão emissor do RG',
            'rg_emission' => 'data de emissão do RG',
            'cpf' => 'CPF',
            'birth_certificate' => 'certidão de nascimento',
            'birth_certificate_lv' => 'livro da certidão',
            'birth_certificate_leaves' => 'folhas da certidão',
            'professional_card' => 'carteira profissional',
            'professional_card_series' => 'série da carteira',
            'cns' => 'cartão do SUS (CNS)',
            'sus_card' => 'cartão do SUS',
            'dependency_level' => 'grau de dependência',
            'is_diabetic' => 'diabético',
            'is_hypertensive' => 'hipertenso',
            'is_epileptic' => 'epiléptico',
            'amenities' => 'comodidades',
        ];
    }
}
