import { useCallback, useEffect, useRef } from 'react';

type ReturnTypes = [
  () => Promise<string> | undefined,
  (text: string) => Promise<void> | undefined
];

const useClipboard = (): ReturnTypes => {
  const clipboardRef = useRef<Clipboard>();

  // TODO - permission에 따른 callback 함수 받도록 처리하기
  const readText = useCallback(() => {
    return clipboardRef.current?.readText();
  }, []);

  const writeText = useCallback((text: string) => {
    return clipboardRef.current?.writeText(text);
  }, []);

  // browser api 부분은 ref에 저장해서 사용이 가능하다.
  useEffect(() => {
    clipboardRef.current = navigator.clipboard;
  }, []);

  return [readText, writeText];
};

export default useClipboard;
