import Input from '../../../common/Input';

interface MessageFormProps {
  onSubmit: (text: string) => void;
  onChange: () => void;
}

import { FormEventHandler, useRef } from 'react';

const MessageForm = ({ onSubmit, onChange }: MessageFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const target = evt.target as typeof evt.target & {
      text: { value: string };
    };
    const text = target.text.value.trim();
    if (text.length > 0) onSubmit(text);
    formRef.current?.reset();
  };

  return (
    <form
      className={'mx-8 flex flex-col gap-y-4 gap-x-8 xl:flex-row'}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Input name={'text'} placeholder={'Start chatting!'} onChange={onChange} />
      <button
        className={
          'flex justify-center whitespace-nowrap rounded-lg bg-button px-16 py-2 font-semibold text-white hover:bg-blue-500 active:bg-blue-700'
        }
      >
        Send message
      </button>
    </form>
  );
};

export default MessageForm;
