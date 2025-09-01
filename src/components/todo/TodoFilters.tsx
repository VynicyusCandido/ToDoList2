'use client'
import { useTodoStore } from '@/store/todoStore';
import { Button } from '../ui/button';
import { log } from '@/lib/logger';

// Exemplos de uso
log.info('Todo adicionado', { text: 'Comprar leite' });
log.warn('Usuário tentou adicionar todo vazio');
log.debug('Estado atualizado', { todosCount: 5 });

export default function TodoFilters() {
  const { filter, setFilter } = useTodoStore();

  const handleFilterChange = (newFilter: string) => {
    log.info('Filter changed', { 
      from: filter, 
      to: newFilter 
    });
    setFilter(newFilter);
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        onClick={() => handleFilterChange('all')}
      >
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'default' : 'outline'}
        onClick={() => handleFilterChange('active')}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'default' : 'outline'}
        onClick={() => handleFilterChange('completed')}
      >
        Completed
      </Button>
    </div>
  );
}