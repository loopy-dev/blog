import ContentLayout from './ContentLayout';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const ArticleLayout = ({ title, children }: Props) => {
  return (
    <ContentLayout>
      <header>
        <h1 className="font-bold text-3xl my-8 break-all">{title}</h1>
      </header>
      <section className="flex flex-col gap-40">{children}</section>
    </ContentLayout>
  );
};

export default ArticleLayout;
