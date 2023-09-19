import './Dialog.css';

export default function Dialog({ title, message, img, onConfirm }) {
  return (
    <div id="dialog">
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {img && <img width="50%" src={img} alt="fainted" />}
      <button id="confirm-btn" className="btn-primary" onClick={onConfirm}>
        OK
      </button>
    </div>
  );
}
