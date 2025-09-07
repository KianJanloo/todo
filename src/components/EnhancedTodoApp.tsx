'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Todo, TodoCategory, TodoPriority, FilterOption, SortOption, TodoStats } from '@/types/todo';
import { useTheme } from '@/contexts/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import EnhancedTodoItem from './EnhancedTodoItem';
import EnhancedTodoForm from './EnhancedTodoForm';
import TodoStats from './TodoStats';

export default function EnhancedTodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TodoCategory | 'all'>('all');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('created');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { isDark } = useTheme();

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('enhanced-todo-app-todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('enhanced-todo-app-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (data: {
    text: string;
    description?: string;
    category: TodoCategory;
    priority: TodoPriority;
    dueDate?: Date;
    tags: string[];
  }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: data.text,
      description: data.description,
      completed: false,
      category: data.category,
      priority: data.priority,
      dueDate: data.dueDate,
      tags: data.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      archived: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ));
    setEditingId(null);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updated = { ...todo, completed: !todo.completed, updatedAt: new Date() };
        if (updated.completed && !todo.completed) {
          updated.completedAt = new Date();
        } else if (!updated.completed) {
          updated.completedAt = undefined;
        }
        return updated;
      }
      return todo;
    }));
  };

  const archiveTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, archived: !todo.archived, updatedAt: new Date() }
        : todo
    ));
  };

  const startEditing = (id: string) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  // Filter and sort todos
  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(query) ||
        todo.description?.toLowerCase().includes(query) ||
        todo.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(todo => todo.category === selectedCategory);
    }

    // Apply status filter
    switch (selectedFilter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed && !todo.archived);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed && !todo.archived);
        break;
      case 'archived':
        filtered = filtered.filter(todo => todo.archived);
        break;
      case 'overdue':
        filtered = filtered.filter(todo => 
          todo.dueDate && 
          new Date(todo.dueDate) < new Date() && 
          !todo.completed && 
          !todo.archived
        );
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'due':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'category':
          return a.category.localeCompare(b.category);
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        default:
          return 0;
      }
    });

    return filtered;
  }, [todos, searchQuery, selectedCategory, selectedFilter, selectedSort]);

  // Calculate stats
  const stats: TodoStats = useMemo(() => {
    const activeTodos = todos.filter(todo => !todo.archived);
    const completedTodos = activeTodos.filter(todo => todo.completed);
    const remainingTodos = activeTodos.filter(todo => !todo.completed);
    
    const byCategory = {
      work: { total: 0, completed: 0 },
      study: { total: 0, completed: 0 },
      personal: { total: 0, completed: 0 },
      health: { total: 0, completed: 0 },
      finance: { total: 0, completed: 0 },
      hobby: { total: 0, completed: 0 },
    };

    activeTodos.forEach(todo => {
      byCategory[todo.category].total++;
      if (todo.completed) {
        byCategory[todo.category].completed++;
      }
    });

    return {
      total: activeTodos.length,
      completed: completedTodos.length,
      remaining: remainingTodos.length,
      byCategory,
    };
  }, [todos]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header 
        onSearch={setSearchQuery}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory}
          selectedFilter={selectedFilter}
          selectedSort={selectedSort}
          onCategoryChange={setSelectedCategory}
          onFilterChange={setSelectedFilter}
          onSortChange={setSelectedSort}
          stats={stats}
        />

        <main className="flex-1 lg:ml-0">
          <div className="p-6 max-w-6xl mx-auto">
            {/* Stats */}
            <TodoStats stats={stats} />

            {/* Add Todo Form */}
            <div className="mb-8">
              <EnhancedTodoForm onSubmit={addTodo} />
            </div>

            {/* Todo List */}
            <div className={`rounded-lg shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              {filteredAndSortedTodos.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {searchQuery 
                      ? 'No tasks found matching your search'
                      : selectedFilter === 'all' 
                        ? 'No tasks added yet' 
                        : `No ${selectedFilter} tasks found`
                    }
                  </h3>
                  <p className="opacity-75">
                    {searchQuery 
                      ? 'Try adjusting your search terms'
                      : 'Add your first task to get started'
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAndSortedTodos.map(todo => (
                    <EnhancedTodoItem
                      key={todo.id}
                      todo={todo}
                      isEditing={editingId === todo.id}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onArchive={archiveTodo}
                      onEdit={startEditing}
                      onUpdate={updateTodo}
                      onCancelEdit={cancelEditing}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer info */}
            <div className="mt-8 text-center text-sm opacity-75">
              Showing {filteredAndSortedTodos.length} of {todos.length} tasks
              {searchQuery && ` • Searching for "${searchQuery}"`}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
