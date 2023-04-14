import { useState } from 'react';
import Input from '~components/common/Input';
import ContentLayout from '~components/layouts/ContentLayout';
import useDebounce from '~hooks/useDebounce';

const Page = () => {
  const [value, setValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  const debounced = useDebounce((target: string) => {
    setDebouncedValue(target);
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounced(e.target.value);
  };

  return (
    <ContentLayout>
      <Input value={value} onChange={handleChange} />
      {value}
      {debouncedValue}
    </ContentLayout>
  );
};

export default Page;
