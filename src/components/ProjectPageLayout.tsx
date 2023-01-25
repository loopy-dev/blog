import NavigationBar from './NavigationBar';

interface Props {
  children: React.ReactNode;
}

const ProjectPageLayout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar />
      <main className="md:ml-16">{children}</main>
    </>
  );
};

export default ProjectPageLayout;
