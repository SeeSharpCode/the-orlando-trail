import './Welcome.css';

export default function Welcome({ onSubmit }) {
  return (
    <div id="welcome">
      <h1>
        Welcome to <br />
        The Orlando Trail!
      </h1>
      <div id="welcome-content">
        <img src="background.png" />
        <div>
          <p>
            The Orlando Trail allows you to relive a journey taken by thousands of tourists every day. It is a long,
            difficult journey -- one that often results in failure and cranky toddlers. But for those who succeed, they
            merely lose thousands of dollars!
          </p>
          <p>
            How will your party handle the Florida heat? How will you cross parade crowds? Can you overcome Dysneyterry?
            The Orlando Trail poses these and other exciting challenges.
          </p>
        </div>
      </div>
      <button className="btn-primary" onClick={onSubmit}>
        TRAVEL THE TRAIL{' '}
      </button>
    </div>
  );
}
