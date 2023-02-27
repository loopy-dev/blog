import Modal, { useModalContext } from '~/components/common/Modal';

const Page = () => {
  const { open } = useModalContext();
  return (
    <div>
      <button onClick={open}>Open</button>
      <Modal>Hello</Modal>
    </div>
  );
};

export default Page;
