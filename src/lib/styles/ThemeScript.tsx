const ThemeScript = () => {
  const setTheme = `
    (function () {
      function getInitTheme() {
        const theme = window.localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        return theme ? theme : systemPrefersDark ? 'dark' : 'light';
      }

      const theme = getInitTheme();
      document.body.dataset.theme = theme;
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: setTheme }} />;
};

export default ThemeScript;
