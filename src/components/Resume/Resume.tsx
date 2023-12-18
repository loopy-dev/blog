'use client';

import FadeInUp from '../common/FadeInUp';
import Introduction from './Introduction';
import Body from './Body';

const Resume = () => {
  return (
    <div>
      <FadeInUp>
        <Introduction />
      </FadeInUp>
      <Body />
    </div>
  );
};

export default Resume;
