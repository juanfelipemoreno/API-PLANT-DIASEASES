import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadComp({ percent = 0 }) {

  const [progress, setProgress] = useState(percent);

  useEffect(() => {
    const simulateProgress = () => {
      let current = 0;
      const interval = setInterval(() => {
        current += Math.random() * 10;
        if (current >= 90) {
          clearInterval(interval);
        }
        setProgress(Math.min(Math.round(current), 100));
      }, 200);
    };

    simulateProgress();
  }, []);

  return (
    <>
      <div className='container'>
        <Spinner animation="border" role="status" style={{ 'width': '8rem', 'height': '8rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div className="progress-wrapper py-4">
          <div className="progress-bar-bg" style={{ 'width': `${progress}%` }}>
            <div className="progress-bar-fill" id="progress-bar"></div>
          </div>
          <p className="progress-text" id="progress-text">{progress}% uploaded</p>
        </div>
      </div>
    </>
  );
}

export default LoadComp;