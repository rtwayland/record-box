import styled from '@emotion/styled';

const Button = styled.button<{
  padding?: string | number;
  margin?: string | number;
}>(({ padding, margin }) => ({
  fontSize: 14,
  cursor: 'pointer',
  padding,
  margin,
}));

export default Button;
