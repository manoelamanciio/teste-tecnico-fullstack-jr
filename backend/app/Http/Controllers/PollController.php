<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePollRequest;
use App\Models\Poll;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class PollController extends Controller
{
    public function store(StorePollRequest $request): JsonResponse
    {
        $poll = DB::transaction(function () use ($request) {
            $poll = Poll::create([
                'question' => $request->validated('question'),
            ]);

            $options = array_map(
                fn (string $text): array => ['text' => $text],
                $request->validated('options')
            );

            $poll->options()->createMany($options);

            return $poll;
        });

        return response()->json(
            $poll->load('options'),
            201
        );
    }
}