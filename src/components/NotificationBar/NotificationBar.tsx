import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~components/common/Button';
import { close } from './notificationSlice';
import type { RootState } from '~store/.';

interface Props {
  background?: 'primary' | 'success' | 'error';
  children?: React.ReactNode;
}
const NotificationBar = ({ children, background = 'primary' }: Props) => {
  const notificationState = useSelector(
    (state: RootState) => state.isNotificationOpen
  );
  const dispatch = useDispatch();
  const closeNotificationBar = () => {
    dispatch(close());
  };

  return children && notificationState ? (
    <div
      className={classNames(
        'absolute',
        'z-[1]',
        'w-full',
        'text-white',
        'shadow-[inset_0_-1px_0_0_rgba(0, 0, 0, 0.1)]',
        {
          'bg-[color:var(--success)]': background === 'success',
          'bg-[color:var(--primary)]': background === 'primary',
          'bg-[color:var(--error)]': background === 'error',
        }
      )}
    >
      <div
        className={classNames(
          'flex',
          'justify-center',
          'items-center',
          'gap-4',
          'mx-auto',
          'py-2',
          'px-6',
          'w-full'
        )}
      >
        <div>{children}</div>
        <Button size="xs" variant="transparent" onClick={closeNotificationBar}>
          Close
        </Button>
      </div>
    </div>
  ) : null;
};

export default NotificationBar;
