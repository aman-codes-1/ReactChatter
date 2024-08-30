import { useLayoutEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { updateHeight } from '../../helpers';
import { SuccessErrorMessageProps } from './ISuccessErrorMessage';
import { SuccessErrorMessageStyled } from './SuccessErrorMessage.styled';

const SuccessErrorMessage = ({ message, type }: SuccessErrorMessageProps) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<any>(null);

  useLayoutEffect(() => {
    updateHeight(ref, setHeight);
    window.addEventListener('resize', () => updateHeight(ref, setHeight));

    return () => {
      window.removeEventListener('resize', () => updateHeight(ref, setHeight));
    };
  }, []);

  return (
    <SuccessErrorMessageStyled height={height}>
      <div className="success-error-message-wrapper" ref={ref}>
        {type === 'error' ? (
          <CancelIcon className="error-dark" />
        ) : (
          <CheckCircleIcon className="success-dark'" />
        )}
        <Typography
          className={`success-error-message ${
            type === 'error' ? 'error-dark' : 'success-dark'
          }`}
          fontWeight={600}
        >
          {message}
        </Typography>
      </div>
    </SuccessErrorMessageStyled>
  );
};

export default SuccessErrorMessage;
