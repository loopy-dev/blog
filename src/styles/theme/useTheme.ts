import { useSelector, useDispatch } from 'react-redux';
import { setLight, setDark } from './themeSlice';
import type { RootState } from '~/store';

type ReturnTypes = [boolean, () => void];

const useTheme = (): ReturnTypes => {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const dispatch = useDispatch();

  const toggle = () => {
    if (isDarkMode) {
      dispatch(setLight());
    } else {
      dispatch(setDark());
    }
  };

  return [isDarkMode, toggle];
};

export default useTheme;
