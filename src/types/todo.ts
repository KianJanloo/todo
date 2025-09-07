export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  category: TodoCategory;
  priority: TodoPriority;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  archived: boolean;
}

export type TodoCategory = 'work' | 'study' | 'personal' | 'health' | 'finance' | 'hobby';
export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SortOption = 'created' | 'due' | 'priority' | 'category' | 'alphabetical';
export type FilterOption = 'all' | 'active' | 'completed' | 'archived' | 'overdue';

export interface TodoStats {
  total: number;
  completed: number;
  remaining: number;
  byCategory: {
    work: { total: number; completed: number };
    study: { total: number; completed: number };
    personal: { total: number; completed: number };
  };
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
