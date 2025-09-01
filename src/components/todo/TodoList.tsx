import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '@/types/todo';
import { Circle } from '@/components/icons';
import { log } from '@/lib/logger';

// Exemplos de uso
log.info('Todo adicionado', { text: 'Comprar leite' });
log.warn('Usuário tentou adicionar todo vazio');
log.debug('Estado atualizado', { todosCount: 5 });

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <Circle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          Não existe nenhuma Tarefa!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};