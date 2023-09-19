import './SetupStep.css';

export default function SetupStep({ handlePrevious, handleNext, children }) {
  return (
    <div className="setup-container">
      <form
        id="setup-form"
        onSubmit={e => {
          e.preventDefault();
          handleNext();
        }}
      >
        <div id="form-content">{children}</div>
        <footer>
          <button className="btn-secondary" disabled={!handlePrevious} type="button" onClick={handlePrevious}>
            BACK
          </button>
          <button className="btn-primary" type="submit">
            NEXT
          </button>
        </footer>
      </form>
    </div>
  );
}
