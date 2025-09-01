import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Todo } from '@/types/todo'

type FilterStatus = 'all' | 'active' | 'completed'

interface TodoStore {
  todos: Todo[]
  filter: FilterStatus
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, title: string) => void
  setFilter: (filter: FilterStatus) => void
  clearCompleted: () => void
  getFilteredTodos: () => Todo[]
  getStats: () => { total: number; completed: number; active: number }
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      
      addTodo: (title: string) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            text: '',
            priority: 'low'
        }
        
        set((state) => ({
          todos: [...state.todos, newTodo],
        }))
      },
      
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
              : todo
          ),
        }))
      },
      
      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))
      },
      
      updateTodo: (id: string, title: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, title, updatedAt: new Date() }
              : todo
          ),
        }))
      },
      
      setFilter: (filter: FilterStatus) => {
        set({ filter })
      },
      
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }))
      },
      
      getFilteredTodos: () => {
        const { todos, filter } = get()
        
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed)
          case 'completed':
            return todos.filter((todo) => todo.completed)
          default:
            return todos
        }
      },
      
      getStats: () => {
        const { todos } = get()
        const total = todos.length
        const completed = todos.filter((todo) => todo.completed).length
        const active = total - completed
        
        return { total, completed, active }
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)