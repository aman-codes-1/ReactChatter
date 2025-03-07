import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { updateHeight } from '../../../helpers';
import { SuccessErrorMessageProps } from './ISuccessErrorMessage';
import { SuccessErrorMessageStyled } from './SuccessErrorMessage.styled';

const SuccessErrorMessage = forwardRef<
  HTMLDivElement,
  SuccessErrorMessageProps
>((props, ref) => {
  const { message, type, className } = props;

  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const update = () => updateHeight(ref, setHeight);
    update();

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <SuccessErrorMessageStyled height={height} ref={ref} className={className}>
      {type === 'error' ? (
        <CancelIcon color="error" />
      ) : (
        <CheckCircleIcon color="success" />
      )}
      <Typography
        className={`message ${type === 'error' ? 'error' : 'success'}`}
      >
        {message}
      </Typography>
    </SuccessErrorMessageStyled>
  );
});

export default SuccessErrorMessage;
