import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('simple-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('simple-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
};