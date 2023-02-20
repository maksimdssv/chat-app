interface MessageFormProps {
  onSubmit: (text: string) => void;
}

import { FormEventHandler, useRef } from 'react';

const MessageForm = ({ onSubmit }: MessageFormProps) => {
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
      <input
        name={'text'}
        className={
          'w-full rounded-lg py-2 px-4 focus:shadow-sm focus:shadow-blue-500 focus:outline focus:outline-blue-500'
        }
        placeholder={'Start chatting!'}
      />
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
