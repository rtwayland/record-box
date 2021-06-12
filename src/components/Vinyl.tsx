import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { lighten } from 'polished';

const Vinyl = ({
  slide,
  color,
  name,
}: {
  slide?: boolean;
  color?: string;
  name?: string;
}) => {
  return (
    <VinylDisc slide={slide}>
      <VinylLabel color={color || ''}>
        <LabelText>{name}</LabelText>
        <VinylHole />
      </VinylLabel>
    </VinylDisc>
  );
};

const spinOut = keyframes({
  '0%': { transform: 'rotate(-130deg)', left: 10 },
  '100%': { transform: 'rotate(75deg)', left: 200 },
});

const spinIn = keyframes({
  '0%': { transform: 'rotate(75deg)', left: 200 },
  '100%': { transform: 'rotate(-130deg)', left: 10 },
});

const VinylDisc = styled.div<{ slide?: boolean }>(
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    height: 360,
    background: 'linear-gradient(45deg, rgb(0,0,0) 10%, rgb(82,82,82) 100%)',
    borderRadius: '50%',
    position: 'absolute',
    transform: 'rotate(-130deg)',
  },
  ({ slide }) => {
    let animation;
    if (slide === true) animation = `${spinOut} 0.5s ease-in`;
    else if (slide === false) animation = `${spinIn} 0.5s ease-in`;
    return {
      animation: animation,
      animationFillMode: 'forwards',
      zIndex: slide ? 2 : 0,
    };
  }
);

const VinylLabel = styled.div(({ color }) => {
  const lightened = lighten(0.1, color || '#000');
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '40%',
    background: `linear-gradient(45deg, ${color} 10%, ${lightened} 100%)`,
    borderRadius: '50%',
    position: 'absolute',
  };
});

const VinylHole = styled.div({
  width: '10%',
  height: '10%',
  backgroundColor: '#fafafa',
  borderRadius: '50%',
  position: 'absolute',
});

const LabelText = styled.span({
  position: 'absolute',
  color: '#fafafa',
});

export default Vinyl;
