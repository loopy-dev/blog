import Image from 'next/image';
import Link from 'next/link';
import Icon from '../icons';
import classes from './NavigationBar.module.scss';

// TODO - show floating menu button when display size is under sm
const NavigationBar = () => {
  return (
    <div
      className={`flex sticky md:flex-col md:h-screen md:fixed md:w-16 top-0 md:left-0 bg-gray-200 justify-between z-10 shadow-md`}
    >
      {/** top */}
      <div className="flex md:flex-col">
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
      <div className="md:flex md:flex-col hidden">
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
    </div>
  );
};

export default NavigationBar;
