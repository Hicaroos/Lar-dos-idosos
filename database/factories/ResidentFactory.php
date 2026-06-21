<?php

namespace Database\Factories;

use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Resident>
 */
class ResidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'registration_number' => $this->faker->unique()->numerify('REG-####'),
            'admission_date' => $this->faker->date(),
            'photo_path' => null,
            'name' => $this->faker->name(),
            'gender' => $this->faker->randomElement(['Masculino', 'Feminino']),
            'birth_date' => $this->faker->dateTimeBetween('-90 years', '-60 years')->format('Y-m-d'),
            'parentage' => $this->faker->name() . ' e ' . $this->faker->name(),
            'naturalness' => $this->faker->city() . ' - ' . $this->faker->stateAbbr(),
            'religion' => $this->faker->randomElement(['Católica', 'Evangélica', 'Espírita', 'Nenhuma']),
            'phone_numbers' => $this->faker->numerify('(##) #####-####'),
            'zip_code' => $this->faker->numerify('#####-###'),
            'address' => $this->faker->streetName(),
            'address_number' => $this->faker->buildingNumber(),
            'neighborhood' => $this->faker->citySuffix(),
            'city' => $this->faker->city(),
            'state' => $this->faker->stateAbbr(),
            'reference_point' => 'Próximo a ' . $this->faker->company(),
            'rg' => $this->faker->numerify('##.###.###-#'),
            'rg_ssp' => 'SSP/' . $this->faker->stateAbbr(),
            'rg_emission' => $this->faker->dateTimeBetween('-40 years', '-10 years')->format('Y-m-d'),
            'cpf' => $this->faker->unique()->numerify('###.###.###-##'),
            'birth_certificate' => $this->faker->numerify('######'),
            'birth_certificate_lv' => $this->faker->numerify('###'),
            'birth_certificate_leaves' => $this->faker->numerify('##'),
            'professional_card' => $this->faker->numerify('#######'),
            'professional_card_series' => $this->faker->numerify('####'),
            'cns' => $this->faker->numerify('### #### #### ####'),
            'sus_card' => $this->faker->numerify('### #### #### ####'),
            'dependency_level' => $this->faker->randomElement([1, 2, 3]),
            'is_diabetic' => $this->faker->boolean(20),
            'is_hypertensive' => $this->faker->boolean(40),
            'is_epileptic' => $this->faker->boolean(5),
            'amenities' => $this->faker->sentence(),
        ];
    }
}
