'use client';

import React, { useState } from 'react';
import { Todo, TodoCategory, TodoPriority } from '@/types/todo';
import { useTheme } from '@/contexts/ThemeContext';

const CATEGORIES: { value: TodoCategory; label: string; color: string }[] = [
  { value: 'work', label: 'Work', color: 'bg-blue-500' },
  { value: 'study', label: 'Study', color: 'bg-green-500' },
  { value: 'personal', label: 'Personal', color: 'bg-purple-500' },
  { value: 'health', label: 'Health', color: 'bg-red-500' },
  { value: 'finance', label: 'Finance', color: 'bg-yellow-500' },
  { value: 'hobby', label: 'Hobby', color: 'bg-pink-500' },
];

const PRIORITIES: { value: TodoPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-gray-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'high', label: 'High', color: 'text-orange-500' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-500' },
];

interface EnhancedTodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onEdit: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onCancelEdit: () => void;
}

export default function EnhancedTodoItem({
  todo,
  isEditing,
  onToggle,
  onDelete,
  onArchive,
  onEdit,
  onUpdate,
  onCancelEdit,
}: EnhancedTodoItemProps) {
  const [editData, setEditData] = useState({
    text: todo.text,
    description: todo.description || '',
    category: todo.category,
    priority: todo.priority,
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
    tags: todo.tags.join(', '),
  });
  const { isDark } = useTheme();

  const handleSave = () => {
    if (editData.text.trim()) {
      const updates: Partial<Todo> = {
        text: editData.text.trim(),
        description: editData.description.trim() || undefined,
        category: editData.category,
        priority: editData.priority,
        dueDate: editData.dueDate ? new Date(editData.dueDate) : undefined,
        tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        updatedAt: new Date(),
      };
      onUpdate(todo.id, updates);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditData({
        text: todo.text,
        description: todo.description || '',
        category: todo.category,
        priority: todo.priority,
        dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
        tags: todo.tags.join(', '),
      });
      onCancelEdit();
    }
  };

  const categoryInfo = CATEGORIES.find(c => c.value === todo.category);
  const priorityInfo = PRIORITIES.find(p => p.value === todo.priority);
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
      todo.completed ? 'opacity-60' : ''
    } ${isOverdue ? 'border-l-4 border-red-500' : ''} ${
      todo.archived ? 'bg-gray-100 dark:bg-gray-800' : ''
    }`}>
      {isEditing ? (
        <div className="space-y-4">
          {/* Edit form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Task Title</label>
              <input
                type="text"
                value={editData.text}
                onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                onKeyDown={handleKeyPress}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value as TodoCategory })}
                className={`w-full px-3 py-2 rounded-lg border ${
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
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value as TodoPriority })}
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
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={editData.dueDate}
                onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Add a description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={editData.tags}
              onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="work, important, project"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={onCancelEdit}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Main task row */}
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggle(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : isDark
                  ? 'border-gray-400 hover:border-green-500 hover:bg-green-500/10'
                  : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
              }`}
            >
              {todo.completed && '✓'}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${todo.completed ? 'line-through opacity-60' : ''}`}>
                    {todo.text}
                  </h3>
                  {todo.description && (
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {todo.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Priority indicator */}
                  <span className={`text-xs font-medium ${priorityInfo?.color}`}>
                    {priorityInfo?.label}
                  </span>
                  
                  {/* Category badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${categoryInfo?.color}`}>
                    {categoryInfo?.label}
                  </span>
                </div>
              </div>

              {/* Tags */}
              {todo.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {todo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs ${
                        isDark
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Due date and metadata */}
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                {todo.dueDate && (
                  <span className={`flex items-center gap-1 ${
                    isOverdue ? 'text-red-500 font-medium' : ''
                  }`}>
                    📅 {formatDate(new Date(todo.dueDate))}
                    {isOverdue && ' (Overdue)'}
                  </span>
                )}
                <span>Created {formatDate(todo.createdAt)}</span>
                {todo.completedAt && (
                  <span className="text-green-500">
                    Completed {formatDate(todo.completedAt)}
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(todo.id)}
                className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => onArchive(todo.id)}
                className="p-2 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900 rounded-lg transition-colors"
                title={todo.archived ? 'Unarchive' : 'Archive'}
              >
                {todo.archived ? '📤' : '📦'}
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
        </div>
      )}
    </div>
  );
}
