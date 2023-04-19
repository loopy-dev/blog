import classNames from 'classnames';
import ContentLayout from './ContentLayout';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const ArticleLayout = ({ title, children }: Props) => {
  return (
    <ContentLayout>
      <h1 className={classNames('font-bold', 'text-3xl', 'my-8', 'break-all')}>
        {title}
      </h1>
      <div className={classNames('flex', 'flex-col', 'gap-40')}>{children}</div>
    </ContentLayout>
  );
};

export default ArticleLayout;
