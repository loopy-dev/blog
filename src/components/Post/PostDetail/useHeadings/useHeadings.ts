import { useEffect, useState } from 'react';
import { getHeadings } from '../../utils';

const useHeadings = (selector: string) => {
  const [heads, setHeads] = useState<HTMLHeadingElement[]>([]);

  // NOTE - post domain dependent
  useEffect(() => {
    const $headings = getHeadings(selector).sort(
      (a, b) => (Number(a.dataset.index) ?? 0) - (Number(b.dataset.index) ?? 0)
    );

    // element
    setHeads($headings);
  }, [selector]);

  return heads;
};

export default useHeadings;
