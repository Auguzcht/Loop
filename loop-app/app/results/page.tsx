'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCw, Home, CheckCircle2, XCircle } from 'lucide-react';
import type { QuestionResult } from '@/types/quiz';

interface QuizResults {
  score: number;
  total: number;
  results: QuestionResult[];
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('quizResults');
    if (stored) {
      setResults(JSON.parse(stored));
    } else {
      // No results found, redirect to home
      router.push('/');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-terracotta-300 border-t-transparent" />
      </div>
    );
  }

  const percentage = Math.round((results.score / results.total) * 100);
  const passed = percentage >= 70;

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo size="md" />
        </div>

        {/* Results Card */}
        <Card className="bg-cream-100 border-2 border-cream-400 rounded-2xl p-10 text-center space-y-6">
          {/* Trophy Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
              passed ? 'bg-sage-100' : 'bg-amber-100'
            }`}
          >
            <Trophy
              className={`w-10 h-10 ${passed ? 'text-sage-400' : 'text-amber-600'}`}
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-medium text-brown-500">
              Quiz Complete!
            </h1>
            <p className="text-lg text-brown-400">
              Here's how you performed
            </p>
          </div>

          {/* Score */}
          <div className="space-y-3">
            <Badge className="bg-sage-100 text-sage-400 font-bold text-3xl px-8 py-3 rounded-xl">
              {results.score} / {results.total}
            </Badge>
            <p className="text-5xl font-bold text-terracotta-400">
              {percentage}%
            </p>
          </div>

          {/* Message */}
          <div className="pt-4">
            {percentage >= 90 && (
              <p className="text-lg text-sage-400 font-medium">
                🎉 Outstanding! You're a true expert!
              </p>
            )}
            {percentage >= 70 && percentage < 90 && (
              <p className="text-lg text-sage-400 font-medium">
                ✨ Great job! You passed with flying colors!
              </p>
            )}
            {percentage >= 50 && percentage < 70 && (
              <p className="text-lg text-amber-600 font-medium">
                📚 Good effort! A bit more practice and you'll ace it!
              </p>
            )}
            {percentage < 50 && (
              <p className="text-lg text-brown-400 font-medium">
                💪 Keep learning! Try again to improve your score!
              </p>
            )}
          </div>
        </Card>

        {/* Question Breakdown */}
        <Card className="bg-cream-100 border-2 border-cream-400 rounded-2xl p-8">
          <h2 className="text-2xl font-medium text-brown-500 mb-6">
            Question Breakdown
          </h2>
          <div className="grid grid-cols-6 gap-3">
            {results.results.map((result, index) => (
              <div
                key={result.id}
                className={`flex items-center justify-center w-12 h-12 rounded-lg font-medium ${
                  result.correct
                    ? 'bg-sage-100 text-sage-400'
                    : 'bg-red-100 text-red-400'
                }`}
                title={result.correct ? 'Correct' : 'Incorrect'}
              >
                {result.correct ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/quiz" className="flex-1">
            <Button className="w-full bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-6 rounded-xl font-medium transition-all hover:shadow-lg">
              <RotateCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full bg-cream-200 hover:bg-cream-300 text-brown-500 border-2 border-cream-400 px-8 py-6 rounded-xl font-medium transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
