<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePollRequest;
use App\Models\Poll;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class PollController extends Controller
{
    public function latest(): JsonResponse
    {
        $poll = Poll::with([
            'options' => function ($query) {
                $query->withCount('votes');
            },
        ])->latest()->first();

        if (! $poll) {
            return response()->json([
                'message' => 'Nenhuma enquete encontrada.',
            ], 404);
        }

        return response()->json($poll);
    }

    public function store(StorePollRequest $request): JsonResponse
    {
        $poll = DB::transaction(function () use ($request) {
            $poll = Poll::create([
                'question' => $request->validated('question'),
            ]);

            foreach ($request->validated('options') as $optionText) {
                $poll->options()->create([
                    'text' => $optionText,
                ]);
            }

            return $poll;
        });

        return response()->json(
            $poll->load('options'),
            201
        );
    }
}
