import Head from 'next/head';
import Activities from '../components/Main/Activities';
import Educations from '../components/Main/Educations';
import Introduction from '../components/Main/Introduction';
import { Projects } from '../components/Project';
import FadeInUp from '../components/common/FadeInUp';
import GlobalLayout from '../components/layouts/GlobalLayout';

const Page = () => {
  return (
    <>
      <Head>
        <title>About Me - Portfolio</title>
        <meta key="title" content="About Me - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        {/** first part of main page, introduction */}
        <FadeInUp>
          <Introduction />
        </FadeInUp>
        <Projects />
        <Educations />
        <Activities />
        {/** Projects - temporary projects(same with projects page) */}
      </GlobalLayout>
    </>
  );
};

export default Page;
