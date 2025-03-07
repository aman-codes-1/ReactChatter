import { AvatarProps as MuiAvatarProps } from '@mui/material';
import { AvatarStyled } from './Avatar.styled';

interface AvatarProps extends MuiAvatarProps {
  name?: string;
}

const Avatar = (props: AvatarProps) => {
  const { name = '', slotProps, ...rest } = props;

  const nameFirstLetter =
    !rest?.src && name && typeof name === 'string'
      ? name?.substring(0, 1).toUpperCase()
      : '';

  return (
    <AvatarStyled
      {...rest}
      alt={name}
      slotProps={{
        ...slotProps,
        img: { ...slotProps?.img, referrerPolicy: 'no-referrer' },
      }}
    >
      {nameFirstLetter || null}
    </AvatarStyled>
  );
};

export default Avatar;
