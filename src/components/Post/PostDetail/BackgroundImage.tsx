import classNames from 'classnames';

interface Props {
  src?: string;
  children?: React.ReactNode;
}

const BackgroundImage = ({ src, children }: Props) => {
  return (
    <div className={classNames('fixed', 'top-0', 'left-0', 'w-full', 'z-[-1]')}>
      <div className={classNames('relative', 'w-full', 'mx-auto')}>
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="cover-image"
            src={src}
            className={classNames(
              'block',
              'w-full',
              'object-cover',
              'bg-no-repeat',
              'h-[600px]'
            )}
          />
        )}
        {children && (
          <div
            className={classNames(
              'absolute',
              'w-full',
              'h-full',
              'top-0',
              'left-0',
              'bg-black/30'
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundImage;
