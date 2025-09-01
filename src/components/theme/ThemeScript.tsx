export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var savedTheme = localStorage.getItem('theme-storage');
              var theme = 'light';
              
              if (savedTheme) {
                var parsed = JSON.parse(savedTheme);
                theme = parsed.state.theme || 'light';
              } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = 'dark';
              }
              
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              console.error('Error applying theme:', e);
            }
          })();
        `,
      }}
    />
  )
}