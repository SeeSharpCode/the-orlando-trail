import { useEffect, useRef } from 'react';
import { LogMessage, useLogs } from '../../state';
import './Logs.css';

export function Logs() {
  const logs = useLogs();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  });

  return (
    <div id="logs" ref={logRef}>
      {logs.map((log: LogMessage, i: number) => {
        return (
          <p key={i} title={log.hoverText}>
            {log.text}
          </p>
        );
      })}
    </div>
  );
}
