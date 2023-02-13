import Head from 'next/head';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import ContentLayout from '../../components/layouts/ContentLayout';
import GlobalLayout from '../../components/layouts/GlobalLayout';

const Page = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Feedback - Portfolio</title>
        <meta key="title" content="Feedback - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        <ContentLayout>
          <header className="my-8">
            <h1 className="font-bold text-3xl my-4 break-all">Feedback</h1>
            <h2 className="text-gray-500">
              더 나은 홈페이지를 위하여 피드백을 주세요!
            </h2>
          </header>
          <form onSubmit={handleSubmit}>
            <section className="flex flex-col gap-8 bg-white rounded-md border drop-shadow-sm hover:border-gray-600 transition-all p-8">
              <Input
                id="email"
                label="이메일"
                placeholder="your e-mail"
                type="email "
              />
              <TextArea
                id="feedback"
                label="피드백"
                placeholder="피드백을 적어주세요."
                rows={10}
              />
              <div className="flex justify-end gap-4">
                <Button>제출하기</Button>
              </div>
            </section>
          </form>
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
