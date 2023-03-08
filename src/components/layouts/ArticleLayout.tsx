import ContentLayout from './ContentLayout';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const ArticleLayout = ({ title, children }: Props) => {
  return (
    <ContentLayout>
      <div>
        <h1 className="font-bold text-3xl my-8 break-all">{title}</h1>
      </div>
      <div className="flex flex-col gap-40">{children}</div>
    </ContentLayout>
  );
};

export default ArticleLayout;
