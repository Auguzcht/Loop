'use client';

import type { RadioQuestion as RadioQuestionType } from '@/types/quiz';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RadioQuestionProps {
  question: RadioQuestionType;
  value: number | undefined;
  onChange: (value: number) => void;
}

export function RadioQuestion({ question, value, onChange }: RadioQuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-medium text-brown-500 mb-6">
        {question.question}
      </h2>
      <RadioGroup
        value={value?.toString()}
        onValueChange={(val) => onChange(parseInt(val, 10))}
        className="space-y-3"
      >
        {question.choices.map((choice, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-5 rounded-xl border-2 border-cream-400 hover:border-terracotta-300 hover:bg-cream-200 transition-all cursor-pointer has-[[data-state=checked]]:bg-terracotta-50 has-[[data-state=checked]]:border-terracotta-300"
          >
            <RadioGroupItem value={index.toString()} id={`${question.id}-${index}`} />
            <Label
              htmlFor={`${question.id}-${index}`}
              className="flex-1 text-lg text-brown-500 cursor-pointer"
            >
              {choice}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
