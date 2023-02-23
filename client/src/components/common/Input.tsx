import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputProps
  extends Pick<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'name' | 'className' | 'placeholder'
  > {
  onChange: (value: string) => void;
}

const Input = ({ name, className, onChange, placeholder }: InputProps) => {
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    onChange(evt.target.value);
  }

  return (
    <input
      name={name}
      className={`w-full rounded-lg py-2 px-4 focus:shadow-sm focus:shadow-blue-500 focus:outline focus:outline-blue-500 ${className}`}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Input;
