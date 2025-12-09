'use client';

import type { Question, Answer } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import { RadioQuestion } from './RadioQuestion';
import { CheckboxQuestion } from './CheckboxQuestion';
import { TextQuestion } from './TextQuestion';

interface QuestionCardProps {
  question: Question;
  answer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
}

export function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  const handleRadioChange = (value: number) => {
    onAnswer({ id: question.id, value });
  };

  const handleCheckboxChange = (value: number[]) => {
    onAnswer({ id: question.id, value });
  };

  const handleTextChange = (value: string) => {
    onAnswer({ id: question.id, value });
  };

  return (
    <Card className="bg-cream-100 border-2 border-cream-400 rounded-2xl p-10 shadow-md">
      {question.type === 'radio' && (
        <RadioQuestion
          question={question}
          value={answer?.value as number | undefined}
          onChange={handleRadioChange}
        />
      )}
      {question.type === 'checkbox' && (
        <CheckboxQuestion
          question={question}
          value={(answer?.value as number[]) || []}
          onChange={handleCheckboxChange}
        />
      )}
      {question.type === 'text' && (
        <TextQuestion
          question={question}
          value={(answer?.value as string) || ''}
          onChange={handleTextChange}
        />
      )}
    </Card>
  );
}
