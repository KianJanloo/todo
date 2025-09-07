'use client';

import React, { useState, useEffect } from 'react';
import { Todo, TodoCategory, TodoStats } from '@/types/todo';
import { useTheme } from '@/contexts/ThemeContext';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoStats from './TodoStats';
import ThemeToggle from './ThemeToggle';

const CATEGORIES: { value: TodoCategory; label: string; color: string }[] = [
  { value: 'work', label: 'Work', color: 'bg-blue-500' },
  { value: 'study', label: 'Study', color: 'bg-green-500' },
  { value: 'personal', label: 'Personal', color: 'bg-purple-500' },
];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoCategory | 'all'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { isDark } = useTheme();

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todo-app-todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todo-app-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: TodoCategory) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, text: string, category: TodoCategory) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, text, category, updatedAt: new Date() }
        : todo
    ));
    setEditingId(null);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  };

  const startEditing = (id: string) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const filteredTodos = todos.filter(todo => 
    filter === 'all' || todo.category === filter
  );

  const stats: TodoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    remaining: todos.filter(todo => !todo.completed).length,
    byCategory: {
      work: {
        total: todos.filter(todo => todo.category === 'work').length,
        completed: todos.filter(todo => todo.category === 'work' && todo.completed).length,
      },
      study: {
        total: todos.filter(todo => todo.category === 'study').length,
        completed: todos.filter(todo => todo.category === 'study' && todo.completed).length,
      },
      personal: {
        total: todos.filter(todo => todo.category === 'personal').length,
        completed: todos.filter(todo => todo.category === 'personal' && todo.completed).length,
      },
    },
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Daily Task Manager</h1>
            <p className="text-lg opacity-75">Organize and track your daily tasks</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Stats */}
        <TodoStats stats={stats} />

        {/* Add Todo Form */}
        <div className={`p-6 rounded-lg shadow-lg mb-8 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <TodoForm onSubmit={addTodo} />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({todos.length})
            </button>
          {CATEGORIES.map(category => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === category.value
                  ? `${category.color} text-white`
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label} ({todos.filter(todo => todo.category === category.value).length})
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className={`rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          {filteredTodos.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">
                {filter === 'all' ? 'No tasks added yet' : `No tasks in ${CATEGORIES.find(c => c.value === filter)?.label} category`}
              </h3>
              <p className="opacity-75">
                {filter === 'all' ? 'Add your first task' : 'Add a new task in this category'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={editingId === todo.id}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={startEditing}
                  onUpdate={updateTodo}
                  onCancelEdit={cancelEditing}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
