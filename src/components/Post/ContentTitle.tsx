import type { FrontMatter } from '~/models/Post';

interface Props {
  postMetaData: FrontMatter;
}

const ContentTitle = ({ postMetaData }: Props) => {
  const date = new Date(postMetaData.createdTime);

  return (
    <div className="my-16">
      <div
        className="title"
        style={{ marginTop: '2rem', marginBottom: '1.21875em' }}
      >
        <h1
          className="font-bold"
          style={{
            maxWidth: '100%',
            width: '100%',
            letterSpacing: '-1px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            caretColor: 'rgb(55, 53, 47)',
            padding: '3px 2px',
            fontWeight: 600,
            fontSize: '3em',
            lineHeight: '1.3',
            marginTop: '1em',
          }}
        >
          {postMetaData.title}
        </h1>
      </div>
      <div
        className="meta flex flex-row"
        style={{ justifyContent: 'space-between' }}
      >
        <p>
          by <span className="font-bold">mrbartrns</span>
        </p>
        <p className="italic text-slate-400">{`${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`}</p>
      </div>
    </div>
  );
};

export default ContentTitle;
