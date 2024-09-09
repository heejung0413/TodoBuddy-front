import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10분 = 600초
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000); // 1초마다 감소

      return () => clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 정리
    } else {
      navigate('/');
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>남은 시간: {formatTime(timeLeft)}</h1>
    </div>
  );
};

export default Timer;
