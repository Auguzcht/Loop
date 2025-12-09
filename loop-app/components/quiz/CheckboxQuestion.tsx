'use client';

import type { CheckboxQuestion as CheckboxQuestionType } from '@/types/quiz';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSounds } from '@/lib/sounds';

interface CheckboxQuestionProps {
  question: CheckboxQuestionType;
  value: number[];
  onChange: (value: number[]) => void;
}

export function CheckboxQuestion({
  question,
  value = [],
  onChange,
}: CheckboxQuestionProps) {
  const { playClick } = useSounds();

  const handleToggle = (index: number) => {
    playClick();
    const newValue = value.includes(index)
      ? value.filter((v) => v !== index)
      : [...value, index];
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-medium text-brown-500 mb-6">
        {question.question}
      </h2>
      <div className="space-y-3">
        {question.choices.map((choice, index) => {
          const isChecked = value.includes(index);
          return (
            <div
              key={index}
              className={`flex items-center space-x-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${
                isChecked
                  ? 'bg-terracotta-50 border-terracotta-300'
                  : 'border-cream-400 hover:border-terracotta-300 hover:bg-cream-200'
              }`}
              onClick={() => handleToggle(index)}
            >
              <Checkbox
                id={`${question.id}-${index}`}
                checked={isChecked}
                className="pointer-events-none"
              />
              <span className="flex-1 text-lg text-brown-500">
                {choice}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
