<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->id();

            $table->string('registration_number');
            $table->date('admission_date');
            $table->string('photo_path')->nullable();

            $table->string('name');
            $table->string('gender');
            $table->date('birth_date');
            $table->string('parentage')->nullable();
            $table->string('naturalness')->nullable();
            $table->string('religion')->nullable();
            $table->string('phone_numbers')->nullable();

            $table->string('zip_code')->nullable();
            $table->string('address')->nullable();
            $table->string('address_number')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('city')->nullable();
            $table->char('state', 2)->nullable();
            $table->string('reference_point')->nullable();

            $table->string('rg')->nullable();
            $table->string('rg_ssp')->nullable();
            $table->date('rg_emission')->nullable();
            $table->string('cpf')->nullable();
            $table->string('birth_certificate')->nullable();
            $table->string('birth_certificate_lv')->nullable();
            $table->string('birth_certificate_leaves')->nullable();
            $table->string('professional_card')->nullable();
            $table->string('professional_card_series')->nullable();
            $table->string('cns')->nullable();
            $table->string('sus_card')->nullable();

            $table->integer('dependency_level');
            $table->boolean('is_diabetic')->default(false);
            $table->boolean('is_hypertensive')->default(false);
            $table->boolean('is_epileptic')->default(false);
            $table->text('amenities')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
