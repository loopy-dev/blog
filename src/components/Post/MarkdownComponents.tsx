import styled, { css } from 'styled-components';

const headingStyle = css`
  margin-top: 1em;
  padding: 3px 2px;
  max-width: 100%;
  width: 100%;
  line-height: 1.3;
  font-weight: 600;
  caret-color: rgb(55, 53, 47);
  white-space: pre-wrap;
  word-break: break-word;
`;

const listStyle = css`
  margin-top: 1px;
  padding: 3px 0 3px 32px;
  caret-color: rgb(55, 53, 47);
`;

const tableCellStyle = css`
  position: relative;
  padding: 7px 9px;
  min-width: 240px;
  min-height: 32px;
  border: 1px solid rgb(233, 233, 231);
  vertical-align: top;
  text-align: start;
`;

/** component styles are from 'notion'. */
export const Block = styled.div`
  h1 {
    font-size: 1.875em;
    ${headingStyle}
  }

  h2 {
    font-size: 1.5em;
    ${headingStyle}
  }

  h3 {
    font-size: 1.25em;
    ${headingStyle}
  }

  ul {
    list-style-type: disc;
    ${listStyle}
  }

  ol {
    list-style-type: decimal;
    ${listStyle}
  }

  li {
    padding: 3px 2px;
  }

  p {
    margin-top: 1px;
    padding: 3px 2px;
    width: 100%;
    max-width: 100%;
    white-spce: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
  }

  code {
    padding: 0.2em 0.4em;
    border-radius: 3px;
    color: #eb5757;
    background-color: rgba(135, 131, 120, 0.15);
    font-size: 85%;
    white-space: 'normal';
    word-break: 'break-word';
  }

  blockquote {
    display: flex;
    margin: 16px 0;
    padding: 8px 16px;
    width: 100%;
    border-left: 2px solid rgb(139, 108, 239);
    color: rgb(120, 119, 116);
    background-color: transparent;
    fill: rgb(120, 119, 116);
    font-size: 1em;
  }

  pre {
    word-break: break-all;
  }

  table {
    width: 100%;
    table-layout: auto;
    font-size: 87.5%;
    line-height: 1.25em;
    border-collapse: collapse;
  }

  th {
    ${tableCellStyle}
    background-color: rgb(247, 246, 243);
    font-weight: 600;
  }

  td {
    ${tableCellStyle};
    color: inherit;
    fill: inherit;
  }

  a {
    color: rgb(59, 130, 246);
  }

  img {
    margin: 1em auto;
  }
`;
