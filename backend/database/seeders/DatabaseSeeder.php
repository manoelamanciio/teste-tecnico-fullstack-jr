<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'demo@polls.test'],
            [
                'name' => 'Demo User',
                'password' => 'password',
            ]
        );

        $user->tokens()->delete();

        $token = $user->createToken('development')->plainTextToken;

        $this->command->info("API token: {$token}");
    }
}
