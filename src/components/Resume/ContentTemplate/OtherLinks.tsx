import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import type { Link as LinkModel } from '../../../models/Resume';

interface Props {
  otherLinks: LinkModel[];
}

const OtherLinks = ({ otherLinks }: Props) => {
  return (
    <>
      {<h3 className="font-bold text-xl my-4">링크</h3>}
      <ul className="list-disc pl-4">
        {otherLinks.map((link) => (
          <li key={link.url} className="py-1">
            <Anchor href={link.url} rel="noopener noreferrer" target="_blank">
              {link.name}
            </Anchor>
          </li>
        ))}
      </ul>
    </>
  );
};

export default OtherLinks;

const Anchor = styled.a`
  color: ${cssVar('primary_variant')};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    text-decoration: underline;
  }
`;
