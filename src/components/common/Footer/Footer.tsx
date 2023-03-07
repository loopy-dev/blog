import styled from 'styled-components';

const Footer = () => {
  return (
    <Block>
      <a>{"© Ben's Blog"}</a>
      <SubBlock>
        <li>이전 블로그</li>
        <li>Github</li>
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
`;

const SubBlock = styled.ul`
  display: flex;
  justify-content: center;
  gap: 16px;
`;
