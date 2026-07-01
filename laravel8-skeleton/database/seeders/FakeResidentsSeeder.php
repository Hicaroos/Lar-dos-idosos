<?php

namespace Database\Seeders;

use App\Models\Medication;
use App\Models\Resident;
use Faker\Factory;
use Illuminate\Database\Seeder;

class FakeResidentsSeeder extends Seeder
{
    public function run()
    {
        $faker = Factory::create('pt_BR');

        for ($i = 0; $i < 16; $i++) {
            $resident = Resident::create([
                'registration_number' => $faker->unique()->numerify('REG-####'),
                'admission_date' => $faker->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
                'name' => $faker->name,
                'gender' => $faker->randomElement(['Masculino', 'Feminino']),
                'birth_date' => $faker->dateTimeBetween('-90 years', '-65 years')->format('Y-m-d'),
                'father_name' => $faker->name('male'),
                'mother_name' => $faker->name('female'),
                'blood_type' => $faker->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
                'naturalness' => $faker->city.' - '.$faker->stateAbbr,
                'religion' => $faker->randomElement(['Católico', 'Evangélico', 'Espírita', 'Nenhuma']),
                'phone_numbers' => $faker->cellphoneNumber,
                'zip_code' => $faker->postcode,
                'address' => $faker->streetName,
                'address_number' => $faker->buildingNumber,
                'neighborhood' => $faker->citySuffix,
                'city' => $faker->city,
                'state' => $faker->stateAbbr,
                'reference_point' => 'Próximo a '.$faker->company,
                'rg' => $faker->rg,
                'rg_ssp' => 'SSP/'.$faker->stateAbbr,
                'rg_emission' => $faker->dateTimeBetween('-40 years', '-10 years')->format('Y-m-d'),
                'cpf' => $faker->cpf,
                'birth_certificate' => $faker->numerify('######'),
                'birth_certificate_lv' => $faker->numerify('###'),
                'birth_certificate_leaves' => $faker->numerify('##'),
                'professional_card' => $faker->numerify('#######'),
                'professional_card_series' => $faker->numerify('####'),
                'cns' => $faker->numerify('### #### #### ####'),
                'sus_card' => $faker->numerify('### #### #### ####'),
                'dependency_level' => $faker->numberBetween(1, 3),
                'is_diabetic' => $faker->boolean,
                'is_hypertensive' => $faker->boolean,
                'is_epileptic' => $faker->boolean,
                'amenities' => $faker->sentence,
            ]);

            $shifts = ['Manhã', 'Tarde', 'Noite'];
            $times = [
                'Manhã' => ['08:00', '10:00', '11:00'],
                'Tarde' => ['14:00', '16:00', '17:00'],
                'Noite' => ['20:00', '22:00', '23:00'],
            ];

            foreach ($shifts as $shift) {
                for ($j = 0; $j < 2; $j++) {
                    Medication::create([
                        'resident_id' => $resident->id,
                        'name' => $faker->randomElement(['Dipirona', 'Losartana', 'Omeprazol', 'AAS', 'Captopril', 'Simvastatina', 'Glibenclamida', 'Metformina', 'Enalapril', 'Furosemida']).' '.$faker->numberBetween(10, 500).'mg',
                        'time' => $times[$shift][$j],
                        'dose' => $faker->randomElement(['1 comprimido', '2 comprimidos', '1 cápsula', '30 gotas', '5ml']),
                        'shift' => $shift,
                    ]);
                }
            }
        }
    }
}
