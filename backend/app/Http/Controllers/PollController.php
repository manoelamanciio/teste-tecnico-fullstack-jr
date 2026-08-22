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
