'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'Profile', icon: '👤', action: () => console.log('Profile') },
    { label: 'Settings', icon: '⚙️', action: () => console.log('Settings') },
    { label: 'Export Data', icon: '📤', action: () => console.log('Export') },
    { label: 'Import Data', icon: '📥', action: () => console.log('Import') },
    { label: 'Help', icon: '❓', action: () => console.log('Help') },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          isDark 
            ? 'hover:bg-gray-800 text-gray-300' 
            : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
          U
        </div>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className={`border-t my-1 ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`} />
          <button
            onClick={() => {
              console.log('Sign out');
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
              isDark 
                ? 'hover:bg-gray-700 text-red-400' 
                : 'hover:bg-gray-100 text-red-600'
            }`}
          >
            <span className="text-lg">🚪</span>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
