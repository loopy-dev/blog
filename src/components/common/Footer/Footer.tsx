import Link from 'next/link';
import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

const Footer = () => {
  return (
    <Block>
      <Title href="/">{"© Ben's Devlog"}</Title>
      <SubBlock>
        <Link
          href="https://github.com/mrbartrns"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Item>Github</Item>
        </Link>
        <Link
          href="https://velog.io/@mrbartrns"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Item>이전 블로그(velog)</Item>
        </Link>
        <Link href="/discussion">
          <Item>의견 제출하기</Item>
        </Link>
      </SubBlock>
    </Block>
  );
};

export default Footer;

const Block = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
`;

const Title = styled(Link)`
  padding: 8px;
  text-align: center;
`;

const SubBlock = styled.ul`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const Item = styled.div`
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;
  cursor: pointer;
  width: 100%;
  padding: 4px 8px;
  text-align: center;

  &:hover {
    color: ${cssVar('primary_light')};
  }
`;
