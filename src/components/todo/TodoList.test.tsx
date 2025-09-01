import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { Todo } from '@/types/todo';

const mockTodos: Todo[] = [
  { id: '1', text: 'Test todo 1', completed: false },
  { id: '2', text: 'Test todo 2', completed: true },
];

const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

describe('TodoList', () => {
  it('renders empty state when no todos', () => {
    render(<TodoList todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Não existe nenhuma Tarefa!')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders list of todos', () => {
    render(<TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Test todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test todo 2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('matches snapshot with todos', () => {
    const { container } = render(
      <TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot without todos', () => {
    const { container } = render(
      <TodoList todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    expect(container).toMatchSnapshot();
  });
});