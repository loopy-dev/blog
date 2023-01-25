import type { Link as LinkModel } from '../../models/Project';

interface Props {
  otherLinks?: LinkModel[];
}

const OtherLinks = ({ otherLinks }: Props) => {
  return (
    <>
      {otherLinks ? <h3 className="font-bold text-xl my-4">링크</h3> : null}
      {otherLinks ? (
        <ul className="list-disc pl-4">
          {otherLinks.map((link) => (
            <li key={link.url} className="py-1">
              <a
                className="hover:text-rose-400 transition-all underline text-gray-400"
                href={link.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default OtherLinks;
