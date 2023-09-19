import './TextInput.css';

export default function TextInput({ name, label, placeholder, value, onChange }) {
  return (
    <>
      <label className="text-input-label" htmlFor={name}>
        {label}
      </label>
      <input id={name} placeholder={placeholder} type="text" value={value} onChange={onChange} />
    </>
  );
}
