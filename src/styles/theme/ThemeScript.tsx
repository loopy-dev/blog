const ThemeScript = () => {
  const setTheme = `
    function getInitTheme() {
      const theme = window.localStorage.getItem('theme');
      return theme === 'dark' ? theme : 'light';
    }

    document.body.dataset.theme = getInitTheme();
  `;
  return <script dangerouslySetInnerHTML={{ __html: setTheme }} />;
};

export default ThemeScript;
