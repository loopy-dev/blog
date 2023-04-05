import styled, { css } from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

const headingStyle = css`
  margin-top: 1.5em;
  padding: 3px 2px;
  max-width: 100%;
  width: 100%;
  font-weight: 600;
  caret-color: rgb(55, 53, 47);
  white-space: pre-wrap;
  word-break: break-word;
  letter-spacing: -0.01rem;
`;

const listStyle = css`
  margin-top: 29px;
  caret-color: rgb(55, 53, 47);

  @media (max-width: 768px) {
    matgin-top: 21px;
  }
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

  h4 {
    font-size: 1.15em;
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
    margin-left: 30px;
    margin-bottom: 14px;
    line-height: 1.75;
    letter-spacing: -0.003em;
  }

  p {
    margin-top: 38px;
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    line-height: 1.75;
    letter-spacing: -0.003em;

    @media (max-width: 768px) {
      margin-top: 10px;
    }
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
    margin-top: 38px;
    padding: 8px 16px;
    width: 100%;
    border-left: 2px solid ${cssVar('primary')};
    color: ${cssVar('text3')};
    background-color: ${cssVar('bg_page1')};
    font-size: 1em;
    font-style: italic;

    & p {
      margin: 4px;
    }

    @media (max-width: 768px) {
      line-height: 1.58;
      margin-top: 30px;
      letter-spacing: -0.004em;
    }
  }

  pre {
    margin-top: 43px;
    word-break: break-all;

    @media (max-width: 768px) {
      margin-top: 35px;
    }
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
    color: ${cssVar('primary_variant')};
  }

  img {
    margin: 1em auto;
  }

  figcaption {
    font-size: 90%;
    font-style: italic;
  }

  aside {
    margin: 16px 0;
    width: 100%;
    border-radius: 3px;
    border: 1px solid rgba(55, 53, 47, 0.16);
    padding: 16px 16px 16px 12px;
    color: ${cssVar('text3')};
  }
`;
