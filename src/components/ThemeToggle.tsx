'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 ${
        isDark
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      }`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <HiSun className="w-4 h-4" />
      ) : (
        <HiMoon className="w-4 h-4" />
      )}
    </button>
  );
}
