"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { TodoCategory, FilterOption, SortOption } from "@/types/todo";
import {
  HiX,
  HiClipboardList,
  HiClock,
  HiCheckCircle,
  HiArchive,
  HiBriefcase,
  HiAcademicCap,
  HiUser,
  HiHeart,
  HiCurrencyDollar,
  HiSparkles,
  HiUpload,
  HiDownload,
  HiTrash,
} from "react-icons/hi";
import { HiExclamationTriangle } from "react-icons/hi2";

const CATEGORIES: {
  value: TodoCategory;
  label: string;
  icon: React.ComponentType;
  color: string;
}[] = [
  { value: "work", label: "Work", icon: HiBriefcase, color: "bg-blue-500" },
  {
    value: "study",
    label: "Study",
    icon: HiAcademicCap,
    color: "bg-green-500",
  },
  {
    value: "personal",
    label: "Personal",
    icon: HiUser,
    color: "bg-purple-500",
  },
  { value: "health", label: "Health", icon: HiHeart, color: "bg-red-500" },
  {
    value: "finance",
    label: "Finance",
    icon: HiCurrencyDollar,
    color: "bg-yellow-500",
  },
  { value: "hobby", label: "Hobby", icon: HiSparkles, color: "bg-pink-500" },
];

const FILTERS: {
  value: FilterOption;
  label: string;
  icon: React.ComponentType;
}[] = [
  { value: "all", label: "All Tasks", icon: HiClipboardList },
  { value: "active", label: "Active", icon: HiClock },
  { value: "completed", label: "Completed", icon: HiCheckCircle },
  { value: "archived", label: "Archived", icon: HiArchive },
  { value: "overdue", label: "Overdue", icon: HiExclamationTriangle },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "created", label: "Created Date" },
  { value: "due", label: "Due Date" },
  { value: "priority", label: "Priority" },
  { value: "category", label: "Category" },
  { value: "alphabetical", label: "Alphabetical" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: TodoCategory | "all";
  selectedFilter: FilterOption;
  selectedSort: SortOption;
  onCategoryChange: (category: TodoCategory | "all") => void;
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
  onExportTasks: () => void;
  onImportTasks: () => void;
  onClearCompleted: () => void;
  stats: {
    total: number;
    completed: number;
    byCategory: Record<TodoCategory, { total: number; completed: number }>;
  };
}

export default function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  selectedFilter,
  selectedSort,
  onCategoryChange,
  onFilterChange,
  onSortChange,
  onExportTasks,
  onImportTasks,
  onClearCompleted,
  stats,
}: SidebarProps) {
  const { isDark } = useTheme();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 sm:w-96 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 lg:w-80 ${
          isDark ? "bg-gray-900" : "bg-white"
        } border-r ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg lg:shadow-none`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}>
            <h2 className="text-lg sm:text-xl font-semibold">Navigation</h2>
            <button
              onClick={onClose}
              className={`lg:hidden p-1.5 sm:p-2 rounded-lg transition-colors ${
                isDark
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
            {/* Quick Stats */}
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <h3 className="font-semibold mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Tasks</span>
                  <span className="font-semibold">{stats.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span className="font-semibold text-green-500">
                    {stats.completed}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining</span>
                  <span className="font-semibold text-orange-500">
                    {stats.total - stats.completed}
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div>
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="space-y-1">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedFilter === filter.value
                        ? isDark
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDark
                        ? "hover:bg-gray-800 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      <filter.icon />
                    </span>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => onCategoryChange("all")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedCategory === "all"
                      ? isDark
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-900"
                      : isDark
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <HiClipboardList className="w-5 h-5" />
                  All Categories
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => onCategoryChange(category.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.value
                        ? isDark
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-900"
                        : isDark
                        ? "hover:bg-gray-800 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      <category.icon />
                    </span>
                    <span className="flex-1">{category.label}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${category.color}`}
                    >
                      {stats.byCategory[category.value]?.total || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="font-semibold mb-3">Sort By</h3>
              <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={onExportTasks}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isDark
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <HiUpload className="w-5 h-5" />
                  Export Tasks
                </button>
                <button
                  onClick={onImportTasks}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isDark
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <HiDownload className="w-5 h-5" />
                  Import Tasks
                </button>
                <button
                  onClick={onClearCompleted}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isDark
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <HiTrash className="w-5 h-5" />
                  Clear Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
