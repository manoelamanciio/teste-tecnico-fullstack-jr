<?php

namespace Tests\Feature;

use App\Models\Poll;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class VoteTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_vote_only_once_in_same_poll(): void
    {
        Http::fake();

        $user = User::factory()->create();
        $poll = Poll::create([
            'question' => 'Qual opção você prefere?',
        ]);
        $option = $poll->options()->create([
            'text' => 'Opção A',
        ]);

        Sanctum::actingAs($user);

        $voteData = [
            'option_id' => $option->id,
            'voter_token' => 'test-voter-token',
        ];

        $this->postJson(
            "/api/polls/{$poll->id}/votes",
            $voteData
        )->assertCreated();

        $this->postJson(
            "/api/polls/{$poll->id}/votes",
            $voteData
        )->assertConflict();

        $this->assertSame(1, $poll->votes()->count());

    }
}
