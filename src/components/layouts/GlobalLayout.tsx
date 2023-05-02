import classNames from 'classnames';
import Footer from '~components/common/Footer';
import NavigationBar from '../NavigationBar';

interface Props {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
  return (
    <div className={classNames('relative')}>
      <NavigationBar />
      <main className={classNames('relative', 'min-h-[800px]')}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
