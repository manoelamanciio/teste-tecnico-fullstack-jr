<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PollTest extends TestCase
{
    use DatabaseTransactions;

    public function test_authenticated_user_can_create_poll(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/polls', [
            'question' => 'Qual linguagem você prefere?',
            'options' => [
                'PHP',
                'JavaScript',
            ],
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('question', 'Qual linguagem você prefere?')
            ->assertJsonCount(2, 'options');

        $this->assertDatabaseHas('polls', [
            'question' => 'Qual linguagem você prefere?',
        ]);

        $this->assertDatabaseHas('poll_options', [
            'text' => 'PHP',
        ]);
    }
}