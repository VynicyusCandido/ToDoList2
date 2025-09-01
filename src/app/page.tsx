'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { TodoForm } from '@/components/todo/TodoForm';
import { TodoList } from '@/components/todo/TodoList';
import { useTodos } from '@/hooks/useTodos';
import { useTheme } from '@/hooks/useTheme';

export default function HomePage() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}