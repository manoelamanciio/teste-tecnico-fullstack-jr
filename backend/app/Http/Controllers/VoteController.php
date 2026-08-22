<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoteRequest;
use App\Models\Poll;
use App\Models\Vote;
use Illuminate\Http\JsonResponse;

class VoteController extends Controller
{
    public function store(
        StoreVoteRequest $request,
        Poll $poll
    ): JsonResponse {
        $option = $poll->options()
            ->findOrFail($request->validated('option_id'));

        $vote = Vote::firstOrCreate(
            [
                'poll_id' => $poll->id,
                'voter_token' => $request->validated('voter_token'),
            ],
            [
                'poll_option_id' => $option->id,
            ]
        );

        if (! $vote->wasRecentlyCreated) {
            return response()->json([
                'message' => 'Você já votou nesta enquete.',
            ], 409);
        }

        $poll->load([
            'options' => function ($query) {
                $query->withCount('votes');
            },
        ]);

        return response()->json($poll, 201);
    }
}
