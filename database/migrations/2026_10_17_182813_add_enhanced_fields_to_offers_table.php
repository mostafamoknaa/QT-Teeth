<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->string('badge_text')->nullable()->after('title');
            $table->string('discount_percentage')->nullable()->after('badge_text');
            $table->decimal('original_price', 10, 2)->nullable()->after('discount_percentage');
            $table->decimal('discounted_price', 10, 2)->nullable()->after('original_price');
            $table->date('valid_until')->nullable()->after('discounted_price');
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete()->after('valid_until');
        });
    }

    public function down(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->dropForeign(['service_id']);
            $table->dropColumn([
                'badge_text',
                'discount_percentage',
                'original_price',
                'discounted_price',
                'valid_until',
                'service_id',
            ]);
        });
    }
};
