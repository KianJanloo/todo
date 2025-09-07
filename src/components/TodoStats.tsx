'use client';

import React from 'react';
import { TodoStats as TodoStatsType } from '@/types/todo';
import { useTheme } from '@/contexts/ThemeContext';

interface TodoStatsProps {
  stats: TodoStatsType;
}

export default function TodoStats({ stats }: TodoStatsProps) {
  const { isDark } = useTheme();

  const progressPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <div className={`p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Task Statistics</h2>
      
      {/* Overall Progress */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base sm:text-lg font-semibold">Overall Progress</span>
        </div>
        <div className={`w-full rounded-full h-2 sm:h-3 ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 sm:h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-center mt-2 text-xs sm:text-sm opacity-75">
          {progressPercentage.toFixed(1)}% completed
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Tasks */}
        <div className={`p-3 sm:p-4 rounded-lg text-center ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">
            {stats.total}
          </div>
          <div className="text-xs sm:text-sm opacity-75">Total</div>
        </div>

        {/* Completed Tasks */}
        <div className={`p-3 sm:p-4 rounded-lg text-center ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">
            {stats.completed}
          </div>
          <div className="text-xs sm:text-sm opacity-75">Done</div>
        </div>

        {/* Remaining Tasks */}
        <div className={`p-3 sm:p-4 rounded-lg text-center ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">
            {stats.remaining}
          </div>
          <div className="text-xs sm:text-sm opacity-75">Pending</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mt-4 sm:mt-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">Breakdown by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Object.entries(stats.byCategory).map(([category, data]) => {
            const categoryInfo = {
              work: { label: 'Work', color: 'bg-blue-500' },
              study: { label: 'Study', color: 'bg-green-500' },
              personal: { label: 'Personal', color: 'bg-purple-500' },
              health: { label: 'Health', color: 'bg-red-500' },
              finance: { label: 'Finance', color: 'bg-yellow-500' },
              hobby: { label: 'Hobby', color: 'bg-pink-500' },
            }[category as keyof typeof stats.byCategory];

            // Fallback for unknown categories
            if (!categoryInfo) {
              return null;
            }

            const categoryProgress = data.total > 0 ? (data.completed / data.total) * 100 : 0;

            return (
              <div key={category} className={`p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${categoryInfo.color}`} />
                    <span className="text-sm sm:text-base font-medium">{categoryInfo.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm opacity-75">
                    {data.completed}/{data.total}
                  </span>
                </div>
                <div className={`w-full rounded-full h-1.5 sm:h-2 ${
                  isDark ? 'bg-gray-600' : 'bg-gray-200'
                }`}>
                  <div
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${categoryInfo.color}`}
                    style={{ width: `${categoryProgress}%` }}
                  />
                </div>
                <div className="text-xs text-center mt-1 opacity-75">
                  {categoryProgress.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
