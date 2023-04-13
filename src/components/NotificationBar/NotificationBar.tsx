import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
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
    <Container background={background}>
      <div>
        <p>{children}</p>
        <Button size="xs" variant="transparent" onClick={closeNotificationBar}>
          Close
        </Button>
      </div>
    </Container>
  ) : null;
};

export default NotificationBar;

const Container = styled.div<Props>`
  z-index: 1;
  position: absolute;
  width: 100%;
  background-color: ${({ background }) => {
    switch (background) {
      case 'primary':
        return cssVar('primary');
      case 'success':
        return cssVar('success');
      case 'error':
        return cssVar('failure');
      default:
        return cssVar('primary');
    }
  }};
  color: #fff;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
    padding: 8px 24px;
    width: 100%;
  }
`;
