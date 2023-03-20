import React from 'react';
import Head from 'next/head';
import Recaptcha from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { postFeedbackWithCaptcha } from '~/api/feedback';
import Button from '~components/common/Button';
import Input from '~components/common/Input';
import TextArea from '~components/common/Input/TextArea';
import ContentLayout from '~components/layouts/ContentLayout';
import GlobalLayout from '~components/layouts/GlobalLayout';
import useLoading from '~hooks/common/useLoading';
import type { SubmitHandler } from 'react-hook-form/dist/types';
import type { FeedbackForm } from '~/models/Feedback';
import type { Props as InputProps } from '~components/common/Input/Input';
import type { Props as TextAreaProps } from '~components/common/Input/TextArea';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

const defaultValues = {
  email: '',
  description: '',
};

const Page = () => {
  const recaptchaRef = React.createRef<Recaptcha>();
  const [loading, startTransition] = useLoading();

  const handleSubmit: SubmitHandler<FeedbackForm> = async (data) => {
    try {
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        window.alert('Recaptcha 코드를 확인하세요.');
        return;
      }

      await postFeedbackWithCaptcha(data, token);

      // alert user
      window.alert('성공적으로 제출되었습니다!');
      reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit: onSubmit,
    reset,
    formState,
  } = useForm<FeedbackForm>({
    defaultValues,
  });

  return (
    <>
      <Head>
        <title>Feedback - Portfolio</title>
        <meta key="title" content="Feedback - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        <ContentLayout>
          <Header
            description="더 나은 홈페이지를 위하여 피드백을 주세요!"
            title="피드백"
          />
          <Form
            onSubmit={onSubmit(async (data) => {
              startTransition(await handleSubmit(data));
            })}
          >
            <FormField
              id="email"
              label="이메일"
              placeholder="your e-mail"
              type="email "
              {...register('email', {
                required: true,
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              disabled={loading}
              error={formState.errors.email ? '이메일 형식을 맞춰주세요.' : ''}
            />
            <TextField
              id="description"
              label="피드백"
              placeholder="피드백을 적어주세요."
              rows={10}
              {...register('description', {
                required: true,
                minLength: 3,
              })}
              disabled={loading}
              error={
                formState.errors.description
                  ? '최소 세 글자 이상 입력해야 합니다.'
                  : ''
              }
            />
            <div className="flex justify-end gap-4">
              <Button>제출하기</Button>
            </div>
            <Recaptcha ref={recaptchaRef} sitekey={SITE_KEY} size="invisible" />
          </Form>
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;

interface HeaderProps {
  title: string;
  description?: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className="my-8">
      <h1 className="font-bold text-3xl my-4 break-all">{title}</h1>
      {description && <h2 className="text-gray-500">{description}</h2>}
    </header>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface FormFieldProps extends InputProps {
  error?: string;
}

// eslint-disable-next-line react/display-name
const FormField = React.forwardRef(
  (
    { error, ...props }: FormFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <Input ref={ref} {...props} variant={error ? 'error' : 'default'} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

interface TextFieldProps extends TextAreaProps {
  error?: string;
}

// eslint-disable-next-line react/display-name
const TextField = React.forwardRef(
  (
    { error, ...props }: TextFieldProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <TextArea ref={ref} {...props} variant={error ? 'error' : 'default'} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);
