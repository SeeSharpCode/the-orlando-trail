import { useEffect, useRef } from 'react';
import { LogType, useLogs } from '../../state';
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
      {logs.map((log, i: number) => {
        return (
          <p key={i} className={logClasses[log.type]} title={log.tooltip}>
            {log.message}
          </p>
        );
      })}
    </div>
  );
}

const logClasses: Record<LogType, string> = {
  [LogType.Normal]: '',
  [LogType.Bad]: 'error-text',
  [LogType.Good]: 'success-text',
};
