'use client';

import type { TextQuestion as TextQuestionType } from '@/types/quiz';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextQuestionProps {
  question: TextQuestionType;
  value: string;
  onChange: (value: string) => void;
}

export function TextQuestion({ question, value, onChange }: TextQuestionProps) {
  return (
    <div className="space-y-4">
      <Label htmlFor={question.id}>
        <h2 className="text-2xl font-medium text-brown-500 mb-6">
          {question.question}
        </h2>
      </Label>
      <Input
        id={question.id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer..."
        className="bg-cream-100 border-2 border-cream-400 focus:border-terracotta-300 focus:ring-terracotta-200 text-brown-500 placeholder:text-brown-300 text-lg px-6 py-6 rounded-xl transition-colors"
      />
    </div>
  );
}
