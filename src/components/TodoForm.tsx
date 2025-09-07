'use client';

import React, { useState } from 'react';
import { TodoCategory } from '@/types/todo';
import { useTheme } from '@/contexts/ThemeContext';

const CATEGORIES: { value: TodoCategory; label: string; color: string }[] = [
  { value: 'work', label: 'Work', color: 'bg-blue-500' },
  { value: 'study', label: 'Study', color: 'bg-green-500' },
  { value: 'personal', label: 'Personal', color: 'bg-purple-500' },
];

interface TodoFormProps {
  onSubmit: (text: string, category: TodoCategory) => void;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim(), category);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          New Task
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your task..."
            className={`flex-1 px-4 py-3 rounded-lg border ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TodoCategory)}
            className={`px-4 py-3 rounded-lg border ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
