import {
  ButtonProps as MuiButtonProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ButtonStyled } from './Button.styled';

interface ButtonProps extends MuiButtonProps {
  textHidden?: boolean;
  xsTextHidden?: boolean;
  smTextHidden?: boolean;
  mdTextHidden?: boolean;
}

const Button = (props: ButtonProps) => {
  const theme = useTheme();
  const {
    children,
    textHidden,
    xsTextHidden,
    smTextHidden,
    mdTextHidden,
    ...rest
  } = props;
  const isSmallest = useMediaQuery(theme.breakpoints.down('xs'));
  const isExtraSmallOrBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallOrBelow = useMediaQuery(theme.breakpoints.down('md'));
  const hideText =
    textHidden ||
    (xsTextHidden && isSmallest) ||
    (smTextHidden && isExtraSmallOrBelow) ||
    (mdTextHidden && isSmallOrBelow);

  return (
    <ButtonStyled hideText={hideText} {...rest}>
      {hideText ? null : children}
    </ButtonStyled>
  );
};

export default Button;
