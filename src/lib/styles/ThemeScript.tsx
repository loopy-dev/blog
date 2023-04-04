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

      document.body.dataset.theme = getInitTheme();
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: setTheme }} />;
};

export default ThemeScript;
