'use client';

import React, { useState } from 'react';
import { Todo, TodoCategory } from '@/types/todo';
import { useTheme } from '@/contexts/ThemeContext';

const CATEGORIES: { value: TodoCategory; label: string; color: string }[] = [
  { value: 'work', label: 'Work', color: 'bg-blue-500' },
  { value: 'study', label: 'Study', color: 'bg-green-500' },
  { value: 'personal', label: 'Personal', color: 'bg-purple-500' },
];

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onUpdate: (id: string, text: string, category: TodoCategory) => void;
  onCancelEdit: () => void;
}

export default function TodoItem({
  todo,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onUpdate,
  onCancelEdit,
}: TodoItemProps) {
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const { isDark } = useTheme();

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim(), editCategory);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditCategory(todo.category);
      onCancelEdit();
    }
  };

  const categoryInfo = CATEGORIES.find(c => c.value === todo.category);

  return (
    <div className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
      todo.completed ? 'opacity-60' : ''
    }`}>
      {isEditing ? (
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`flex-1 px-3 py-2 rounded-lg border ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            autoFocus
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as TodoCategory)}
            className={`px-3 py-2 rounded-lg border ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancelEdit}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : isDark
                ? 'border-gray-400 hover:border-green-500'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {todo.completed && '✓'}
          </button>
          
          <div className="flex-1 flex items-center gap-3">
            <span
              className={`flex-1 ${
                todo.completed ? 'line-through opacity-60' : ''
              }`}
            >
              {todo.text}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium text-white ${categoryInfo?.color}`}
            >
              {categoryInfo?.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(todo.id)}
              className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
