import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import ContentLayout from '~components/layouts/ContentLayout';

const Banner = () => {
  return (
    <ContentLayout>
      <Container>
        <Image
          priority
          alt="ben"
          height={0}
          src="/nyan-cat.gif"
          style={{ width: '100%', height: 'auto', marginLeft: '10%' }}
          width={0}
        />
        <div>
          <p>
            Benlog는 현재 공사중이에요.{' '}
            <Link
              href="/posts"
              style={{
                color: `${cssVar('primary_variant')}`,
                textDecoration: 'underline',
              }}
            >
              Posts
            </Link>
            를 눌러 글을 볼 수 있어요.
          </p>
        </div>
      </Container>
    </ContentLayout>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  p {
    line-height: 1.75;
    margin-top: 24px;
  }
`;
