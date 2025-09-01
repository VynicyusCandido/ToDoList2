import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { log } from '@/lib/logger';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const handleThemeToggle = () => {
    log.info('Theme toggled', { 
      from: isDark ? 'dark' : 'light', 
      to: isDark ? 'light' : 'dark' 
    });
    toggleTheme();
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="text-center flex-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Lista de Tarefas
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe suas Tarefas.
        </p>
      </div>
      <ThemeToggle isDark={isDark} toggleTheme={handleThemeToggle} />
    </div>
  );
};