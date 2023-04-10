import styled from 'styled-components';
import Input from '~components/common/Input';

const SearchBar = () => {
  return (
    <Input
      frameSize="lg"
      left={<SearchIcon />}
      placeholder="포스트를 검색해보세요."
      shape="rounded"
    />
  );
};

const SearchIcon = () => {
  return (
    <Container
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Interface / Search_Magnifying_Glass">
        <path
          d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
          id="Vector"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Container>
  );
};

export default SearchBar;

const Container = styled.svg`
  width: 18px;
  height: 18px;

  & g path {
    stroke: #ced4da;
    stroke-width: 2;
  }
`;
