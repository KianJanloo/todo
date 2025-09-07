'use client';

import React, { useState } from 'react';
import { TodoCategory, TodoPriority } from '@/types/todo';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  HiChevronDown, HiBriefcase, HiAcademicCap, HiUser, HiHeart, HiCurrencyDollar, HiSparkles,
  HiPlus, HiLightningBolt
} from 'react-icons/hi';

const CATEGORIES: { value: TodoCategory; label: string; icon: React.ComponentType; color: string }[] = [
  { value: 'work', label: 'Work', icon: HiBriefcase, color: 'bg-blue-500' },
  { value: 'study', label: 'Study', icon: HiAcademicCap, color: 'bg-green-500' },
  { value: 'personal', label: 'Personal', icon: HiUser, color: 'bg-purple-500' },
  { value: 'health', label: 'Health', icon: HiHeart, color: 'bg-red-500' },
  { value: 'finance', label: 'Finance', icon: HiCurrencyDollar, color: 'bg-yellow-500' },
  { value: 'hobby', label: 'Hobby', icon: HiSparkles, color: 'bg-pink-500' },
];

const PRIORITIES: { value: TodoPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-gray-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'high', label: 'High', color: 'text-orange-500' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-500' },
];

interface EnhancedTodoFormProps {
  onSubmit: (data: {
    text: string;
    description?: string;
    category: TodoCategory;
    priority: TodoPriority;
    dueDate?: Date;
    tags: string[];
  }) => void;
  onCancel?: () => void;
  initialData?: Partial<{
    text: string;
    description: string;
    category: TodoCategory;
    priority: TodoPriority;
    dueDate: Date;
    tags: string[];
  }>;
}

export default function EnhancedTodoForm({ onSubmit, onCancel, initialData }: EnhancedTodoFormProps) {
  const [formData, setFormData] = useState({
    text: initialData?.text || '',
    description: initialData?.description || '',
    category: initialData?.category || 'personal' as TodoCategory,
    priority: initialData?.priority || 'medium' as TodoPriority,
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
    tags: initialData?.tags?.join(', ') || '',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.text.trim()) {
      onSubmit({
        text: formData.text.trim(),
        description: formData.description.trim() || undefined,
        category: formData.category,
        priority: formData.priority,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      });
      
      // Reset form
      setFormData({
        text: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        dueDate: '',
        tags: '',
      });
      setIsExpanded(false);
    }
  };

  const quickAdd = (text: string, category: TodoCategory) => {
    onSubmit({
      text,
      category,
      priority: 'medium',
      tags: [],
    });
  };

  const quickTasks = [
    { text: 'Check emails', category: 'work' as TodoCategory, icon: HiBriefcase },
    { text: 'Read for 30 minutes', category: 'study' as TodoCategory, icon: HiAcademicCap },
    { text: 'Exercise', category: 'health' as TodoCategory, icon: HiHeart },
    { text: 'Review budget', category: 'finance' as TodoCategory, icon: HiCurrencyDollar },
  ];

  return (
    <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main input row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="What needs to be done?"
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as TodoCategory })}
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
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
          >
            <HiPlus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        {/* Expand button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-sm flex items-center gap-2 ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <HiChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          {isExpanded ? 'Less options' : 'More options'}
        </button>

        {/* Expanded form */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as TodoPriority })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {PRIORITIES.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Add more details..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="work, important, project"
              />
            </div>

            {onCancel && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick add suggestions */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <HiLightningBolt className="w-4 h-4" />
            Quick Add:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickTasks.map((task, index) => (
              <button
                key={index}
                type="button"
                onClick={() => quickAdd(task.text, task.category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-2 ${
                  isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <task.icon className="w-3 h-3" />
                {task.text}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
