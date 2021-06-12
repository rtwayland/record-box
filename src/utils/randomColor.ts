export const colors = [
  '#349573',
  '#5C4F16',
  '#722537',
  '#3CA5D9',
  '#21044B',
  '#9AA9A8',
  '#DC511D',
  '#383ECF',
  '#030119',
  '#6D1D04',
  '#0D4E84',
  '#2C960F',
  '#DC3F2C',
  '#8B1D7C',
  '#0C1284',
  '#791710',
  '#61747f',
  '#255950',
  '#D76D2D',
  '#5C2520',
  '#EF4F45',
  '#7A5113',
  '#437f5c',
  '#970d14',
  '#486211',
  '#F59A6D',
  '#242604',
  '#085067',
  '#A2B089',
];

const randomColor = () => {
  const index = Math.floor(Math.random() * colors.length + 1);
  return colors[index];
};

export default randomColor;
