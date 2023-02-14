import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { postFeedback } from '../../api/feeback';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import ContentLayout from '../../components/layouts/ContentLayout';
import GlobalLayout from '../../components/layouts/GlobalLayout';
import type { FeebackForm } from '../../models/Feeback';
import type { SubmitHandler } from 'react-hook-form/dist/types';

const Page = () => {
  const handleSubmit: SubmitHandler<FeebackForm> = async (data) => {
    try {
      await postFeedback(data);
      // alert user
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit: onSubmit,
    formState,
  } = useForm<FeebackForm>({
    defaultValues: {
      email: '',
      description: '',
    },
  });

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
          <form
            onSubmit={onSubmit(async (data) => {
              await handleSubmit(data);
            })}
          >
            <section className="flex flex-col gap-8 bg-white rounded-md md:border drop-shadow-sm hover:border-gray-600 transition-all md:p-8">
              <div className="flex flex-col gap-2">
                <Input
                  id="email"
                  label="이메일"
                  placeholder="your e-mail"
                  type="email "
                  {...register('email', {
                    required: true,
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                  variant={formState.errors.email ? 'error' : 'default'}
                />
                {formState.errors.email && (
                  <p className={` text-red-500 text-sm`}>
                    이메일 형식을 맞춰주세요.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <TextArea
                  id="description"
                  label="피드백"
                  placeholder="피드백을 적어주세요."
                  rows={10}
                  {...register('description', {
                    required: true,
                    minLength: 3,
                  })}
                  variant={formState.errors.description ? 'error' : 'default'}
                />
                {formState.errors.description && (
                  <p className="text-red-500 text-sm">
                    최소 세 글자 이상 입력해야 합니다.
                  </p>
                )}
              </div>

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
