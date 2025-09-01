import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from './TodoForm';

const mockOnAddTodo = jest.fn();

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form correctly', () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} />);
    
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onAddTodo with trimmed text when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByRole('button', { name: /add/i });
    
    await user.type(input, '  New todo  ');
    await user.click(button);
    
    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo');
    expect(input).toHaveValue('');
  });

  it('calls onAddTodo when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<TodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    
    await user.type(input, 'New todo{enter}');
    
    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo');
    expect(input).toHaveValue('');
  });

  it('does not call onAddTodo when text is empty', async () => {
    const user = userEvent.setup();
    render(<TodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByRole('button', { name: /add/i });
    
    await user.type(input, '   ');
    await user.click(button);
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { container } = render(<TodoForm onAddTodo={mockOnAddTodo} />);
    expect(container).toMatchSnapshot();
  });
});