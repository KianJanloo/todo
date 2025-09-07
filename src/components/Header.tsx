'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { HiMenu, HiPlus } from 'react-icons/hi';
import { FiCheckSquare } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuToggle: () => void;
  onQuickAdd: () => void;
  onExport?: () => void;
  onImport?: () => void;
}

export default function Header({ onSearch, onMenuToggle, onQuickAdd, onExport, onImport }: HeaderProps) {
  const { isDark } = useTheme();

  const handleSearch = (query: string) => {
    onSearch(query);
  };

  return (
    <header className={`sticky top-0 z-50 border-b ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    } shadow-sm`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu toggle and logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Toggle menu"
            >
              <HiMenu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <FiCheckSquare className="w-5 h-5 text-white" />
              </div>
              <div className='max-md:hidden'>
                <h1 className="text-xl font-bold">Todo</h1>
                <p className="text-sm opacity-75">Productivity Manager</p>
              </div>
            </div>
          </div>

          {/* Center - Search bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Right side - Actions and user menu */}
          <div className="flex items-center gap-3">
            {/* Quick add button */}
            <button
              onClick={onQuickAdd}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              title="Quick add task"
            >
              <HiPlus className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* User menu */}
            <UserMenu onExport={onExport} onImport={onImport} />
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
}
