import { ChangeEventHandler } from 'react';
import './TextInput.css';

interface TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function TextInput({ name, label, placeholder, value, onChange }: TextInputProps) {
  return (
    <>
      <label className="text-input-label" htmlFor={name}>
        {label}
      </label>
      <input id={name} placeholder={placeholder} type="text" value={value} onChange={onChange} />
    </>
  );
}
