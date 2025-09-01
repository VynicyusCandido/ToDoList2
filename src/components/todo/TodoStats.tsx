'use client'
import { useTodos } from '@/hooks/useTodos';

export default function TodoStats() {
  const { todos } = useTodos();
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <div className="mt-4 text-sm text-muted-foreground">
      {completed} of {todos.length} tasks completed
    </div>
  );
}