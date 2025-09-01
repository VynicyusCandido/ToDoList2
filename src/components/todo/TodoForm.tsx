import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from '@/components/icons';
import { log } from '@/lib/logger';

// Exemplos de uso
log.info('Todo adicionado', { text: 'Comprar leite' });
log.warn('Usuário tentou adicionar todo vazio');
log.debug('Estado atualizado', { todosCount: 5 });

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      log.info('Todo added', { text: text.trim() });
      onAddTodo(text.trim());
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
      />
      <Button onClick={handleSubmit}>
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </div>
  );
};