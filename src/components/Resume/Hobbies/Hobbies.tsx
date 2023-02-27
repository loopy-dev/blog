import ArticleLayout from '~/components/layouts/ArticleLayout';
import hobbies from '~/data/hobbies';
import Hobby from './Hobby';

const Hobbies = () => {
  return (
    <ArticleLayout title="취미">
      {hobbies.map((hobby) => (
        <Hobby key={hobby.title} content={hobby} />
      ))}
    </ArticleLayout>
  );
};

export default Hobbies;
