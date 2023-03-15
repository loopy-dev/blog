import { useDispatch, useSelector } from 'react-redux';
import ContentLayout from '~/components/layouts/ContentLayout';
import ThemeProvider from '~styles/theme/ThemeProvider';
import { setDark, setLight } from '~styles/theme/themeSlice';
import type { RootState } from '~store/.';

const Page = () => {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const dispatch = useDispatch();

  const toggle = () => {
    if (isDarkMode) {
      dispatch(setLight());
    } else {
      dispatch(setDark());
    }
  };

  return (
    <ContentLayout>
      <ThemeProvider>
        <h1>Hello, World!</h1>
        <button
          style={{ padding: '1rem', borderRadius: '4px', border: '1px solid' }}
          onClick={toggle}
        >
          toggle
        </button>
      </ThemeProvider>
    </ContentLayout>
  );
};

export default Page;
