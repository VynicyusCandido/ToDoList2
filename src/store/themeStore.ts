import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

// Função para obter o tema inicial de forma segura (SSR)
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  
  const savedTheme = localStorage.getItem('theme-storage')
  if (savedTheme) {
    try {
      const parsed = JSON.parse(savedTheme)
      return parsed.state.theme || 'light'
    } catch {
      return 'light'
    }
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light'
        set({ theme: newTheme })
        
        // Aplicar o tema no documento apenas no cliente
        if (typeof window !== 'undefined') {
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      },
      
      setTheme: (theme: Theme) => {
        set({ theme })
        
        // Aplicar o tema no documento apenas no cliente
        if (typeof window !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Aplicar o tema quando a store for reidratada apenas no cliente
        if (state && typeof window !== 'undefined') {
          if (state.theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      },
    }
  )
)