import classNames from 'classnames';
import { PrismAsyncLight } from 'react-syntax-highlighter';
import styles from '../Post.module.scss';
import { capitalize } from '../utils';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

const filterMap: Record<string, string> = {
  jsx: 'JavaScript JSX',
  tsx: 'TypeScript JSX',
  bash: 'Bash',
  json: 'JSON',
  text: 'Plain Text',
  scss: 'Scss(Sass)',
};

const transformLanguage = (language: string | undefined) => {
  if (!language) return '';

  return filterMap[language] ? filterMap[language] : capitalize(language);
};

const SyntaxHighlighter = ({
  children,
  language,
  ...props
}: SyntaxHighlighterProps) => {
  return (
    <div className={classNames(styles['syntax-highlighter-container'])}>
      <div className={classNames(styles['language-indicator'])}>
        {transformLanguage(language)}
      </div>
      <PrismAsyncLight language={language} {...props}>
        {String(children).replace(/\n$/, '')}
      </PrismAsyncLight>
    </div>
  );
};

export default SyntaxHighlighter;
