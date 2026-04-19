<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create two admin users
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@badrdentalcenter.com',
            'password' => bcrypt('password123'),
            'is_admin' => true,
        ]);

        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'administrator@badrdentalcenter.com',
            'password' => bcrypt('password123'),
            'is_admin' => true,
        ]);

        // Create a regular test user (optional)
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'is_admin' => false,
        ]);
    }
}
