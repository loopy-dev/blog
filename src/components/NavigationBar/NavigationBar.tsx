import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Icon from '../icons';
import classes from './NavigationBar.module.scss';

// TODO - show floating menu button when display size is under sm
const NavigationBar = () => {
  return (
    <Container>
      {/** top */}
      <div className="flex">
        <Link
          className={`${classes['navbar-icon']} flex justify-center items-center w-16 h-16 hover:bg-gray-300 transition-all rounded-lg`}
          href="/"
        >
          <div className="m-2">
            <Image
              priority
              alt="profile"
              className="cursor-pointer"
              height={64}
              src="https://avatars.githubusercontent.com/u/56826914?v=4"
              width={64}
            />
          </div>
        </Link>
        <Link
          className={`${classes['navbar-icon']} flex justify-center items-center w-16 h-16 hover:bg-gray-300 transition-all rounded-lg`}
          href="/posts"
        >
          <Icon type="blog" />
        </Link>
      </div>
      {/** bottom */}
      <div className="flex">
        <a
          className={`${classes['navbar-icon']} flex justify-center items-center w-16 h-16 hover:bg-gray-300 transition-all rounded-lg`}
          href="https://github.com/mrbartrns"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon type="github" />
        </a>
        <a
          className={`${classes['navbar-icon']} flex justify-center items-center w-16 h-16 hover:bg-gray-300 transition-all rounded-lg`}
          href="mailto:mrbartrns@naver.com"
        >
          <Icon type="mail" />
        </a>
        <Link
          className={`${classes['navbar-icon']} flex justify-center items-center w-16 h-16 hover:bg-gray-300 transition-all rounded-lg`}
          href="/feedback"
        >
          <Icon type="project" />
        </Link>
      </div>
    </Container>
  );
};

export default NavigationBar;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  background-color: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: saturate(180%) blur(5px);
  z-index: 99;
`;
