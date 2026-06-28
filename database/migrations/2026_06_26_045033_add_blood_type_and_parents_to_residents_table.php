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
        Schema::table('residents', function (Blueprint $table) {
            $table->string('blood_type')->nullable()->after('gender');
            $table->string('mother_name')->nullable()->after('birth_date');
            $table->string('father_name')->nullable()->after('mother_name');
            $table->dropColumn('parentage');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('residents', function (Blueprint $table) {
            $table->string('parentage')->nullable();
            $table->dropColumn(['blood_type', 'mother_name', 'father_name']);
        });
    }
};
