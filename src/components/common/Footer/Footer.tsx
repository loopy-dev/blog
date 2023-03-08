import Link from 'next/link';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Block>
      <Link href="/">{"© Ben's Blog"}</Link>
      <SubBlock>
        <li>
          <a href="https://velog.io/@mrbartrns">이전 블로그</a>
        </li>
        <li>
          <a
            href="httsp://github.com/mrbartrns"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
        </li>
        <li>
          <Link href="/feedback">의견 제출하기</Link>
        </li>
      </SubBlock>
    </Block>
  );
};

export default Footer;

const Block = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.1);
`;

const SubBlock = styled.ul`
  display: flex;
  justify-content: center;
  gap: 16px;
`;
