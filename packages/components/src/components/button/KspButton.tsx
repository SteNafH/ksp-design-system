import { useState, useEffect } from 'react';

export interface KspButtonProps {
  autoSubmit?: number;
  pill?: boolean;
  preset?: 'primary' | 'secondary';
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  onKspClick?: () => void;
}

const KspButton = ({ autoSubmit, disabled, onKspClick }: KspButtonProps) => {
  const [countdown, setCountdown] = useState<typeof autoSubmit>(autoSubmit);

  useEffect(() => {
    if (countdown === undefined) return;

    if (countdown === 0) {
      onKspClick?.(
        //@ts-ignore
        new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );
      return;
    }

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown! - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown, autoSubmit, onKspClick]);

  return (
    <button
      disabled={disabled || (countdown !== undefined && countdown > 0)}
      onClick={onKspClick}
    >
      Button {countdown}
    </button>
  );
};

export { KspButton };
