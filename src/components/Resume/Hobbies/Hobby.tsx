import type { Resume } from '~/models/Resume';

interface Props {
  content: Resume;
}

const Hobby = ({ content }: Props) => {
  return (
    <div>
      <h2 className="font-bold text-xl">{content.title}</h2>
      {content.introduction && (
        <h3 className="font-bold my-4">{content.introduction}</h3>
      )}
      {content.description && (
        <ul className="my-4 list-disc pl-4">
          {content.description.map((description) =>
            typeof description === 'string' ? (
              <li key={description} className="py-1">
                {description}
              </li>
            ) : (
              <li key={description.name} className="py-1">
                {description.name}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Hobby;
