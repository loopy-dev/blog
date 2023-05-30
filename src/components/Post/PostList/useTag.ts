import { useState } from 'react';

const useTag = () => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const addTag = (tagName: string) => {
    setSelectedTags((prev) => {
      const ret = new Set(Array.from(prev));
      ret.add(tagName);
      return ret;
    });
  };

  const removeTag = (tagName: string) => {
    setSelectedTags((prev) => {
      const ret = new Set(Array.from(prev));
      ret.delete(tagName);
      return ret;
    });
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) => {
      if (prev.has(tagName)) {
        const ret = new Set(Array.from(prev));
        ret.delete(tagName);
        return ret;
      }
      const ret = new Set(Array.from(prev));
      ret.add(tagName);
      return ret;
    });
  };

  const clear = () => {
    setSelectedTags(() => new Set());
  };

  return {
    selectedTags: Array.from(selectedTags),
    addTag,
    removeTag,
    toggleTag,
    clear,
  };
};

export default useTag;
