import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Trash2 } from '@/components/icons';
import { Todo } from '@/types/todo';
import { cn } from '@/lib/utils';
import { log } from '@/lib/logger';

// Exemplos de uso
log.info('Todo adicionado', { text: 'Comprar leite' });
log.warn('Usuário tentou adicionar todo vazio');
log.debug('Estado atualizado', { todosCount: 5 });

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    log.info('Todo toggled', { 
      id: todo.id, 
      completed: !todo.completed,
      text: todo.text 
    });
    onToggle(todo.id);
  };

  const handleDelete = () => {
    log.info('Todo deleted', { 
      id: todo.id, 
      text: todo.text 
    });
    onDelete(todo.id);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow">
      <button
        onClick={handleToggle}
        className="text-blue-600 hover:text-blue-700 transition-colors"
      >
        {todo.completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>
      
      <span className={cn(
        'flex-1 text-sm',
        todo.completed 
          ? 'line-through text-gray-500 dark:text-gray-400' 
          : 'text-gray-900 dark:text-white'
      )}>
        {todo.text}
      </span>
      
      <Button
        variant="ghost"
        onClick={handleDelete}
        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};