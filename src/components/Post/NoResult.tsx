import classNames from 'classnames';
import Lottie from 'lottie-react';
import itemNotFound from '../../../public/item-not-found.json';

interface Props {
  message?: string;
}

const NoResult = ({ message }: Props) => {
  return (
    <div
      className={classNames(
        'flex',
        'flex-col',
        'gap-4',
        'justify-center',
        'items-center'
      )}
    >
      <div className={classNames('mx-auto', 'w-full', 'max-w-[400px]')}>
        <Lottie loop animationData={itemNotFound} />
      </div>
      <p>{message}</p>
    </div>
  );
};

export default NoResult;
