import classNames from './Post.module.scss';

// TODO - add props
const ListItem = () => {
  return (
    <div className="flex gap-2 border rounded-md flex-col-reverse sm:flex-row">
      {/** TODO - left: title, description; right: cover image */}
      <div className="flex flex-col gap-4 p-4 sm:p-8">
        <h3 className="font-bold text-xl">포스트 제목</h3>
        <p className="text-zinc-400">
          포스트 설명 포스트 설명 포스트 설명 포스트 설명 포스트 설명 포스트
          설명 포스트 설명 포스트 설명 포스트 설명 포스트 설명 포스트 설명
          포스트 설명
        </p>
      </div>
      <div className={`${classNames.img} border-l shrink-0`}>사진</div>
    </div>
  );
};

export default ListItem;
