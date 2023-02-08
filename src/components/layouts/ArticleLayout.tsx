interface Props {
  title: string;
  children?: React.ReactNode;
}

const ArticleLayout = ({ title, children }: Props) => {
  return (
    <article className="mx-auto max-w-4xl p-8">
      <header>
        <h1 className="font-bold text-3xl my-8 break-all">{title}</h1>
      </header>
      <section className="flex flex-col gap-40">{children}</section>
    </article>
  );
};

export default ArticleLayout;
