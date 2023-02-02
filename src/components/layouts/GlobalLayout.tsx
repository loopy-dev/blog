import NavigationBar from '../NavigationBar';

interface Props {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar />
      <main className="md:ml-16">{children}</main>
    </>
  );
};

export default GlobalLayout;
