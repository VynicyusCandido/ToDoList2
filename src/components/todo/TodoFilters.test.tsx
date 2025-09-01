import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoFilters from './TodoFilters';
import { useTodoStore } from '@/store/todoStore';

// Mock the store
jest.mock('@/store/todoStore');

const mockUseTodoStore = useTodoStore as jest.MockedFunction<typeof useTodoStore>;

describe('TodoFilters', () => {
  const mockSetFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodoStore.mockReturnValue({
      filter: 'all',
      setFilter: mockSetFilter,
      // Add other store properties if needed
      todos: [],
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    });
  });

  it('renders all filter buttons', () => {
    render(<TodoFilters />);
    
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it('calls setFilter when filter button is clicked', () => {
    render(<TodoFilters />);
    
    const activeButton = screen.getByRole('button', { name: /active/i });
    fireEvent.click(activeButton);
    
    expect(mockSetFilter).toHaveBeenCalledWith('active');
  });

  it('shows active style for current filter', () => {
    mockUseTodoStore.mockReturnValue({
      filter: 'active',
      setFilter: mockSetFilter,
      todos: [],
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    });

    render(<TodoFilters />);
    
    const activeButton = screen.getByRole('button', { name: /active/i });
    expect(activeButton).toHaveClass('bg-primary');
  });

  it('matches snapshot', () => {
    const { container } = render(<TodoFilters />);
    expect(container).toMatchSnapshot();
  });
});