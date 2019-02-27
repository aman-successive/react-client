export const PUBLIC_IMAGE_FOLDER = './images/banners/';
export const DEFAULT_BANNER_IMAGE = `${PUBLIC_IMAGE_FOLDER}default.png`;
export const option = [
  { label: 'FootBall', value: 1 },
  { label: 'Cricket', value: 2 },
];

const cricket = [
  { label: 'Wicket Keeper', value: 1 },
  { label: 'Bowler', value: 2 },
  { label: 'Batsman', value: 3 },
  { label: 'All Rounder', value: 4 },
];
const footBall = [
  { label: 'Defender', value: 1 },
  { label: 'Striker', value: 2 },
];

export const RADIO_OPTIONS = {
  FootBall: footBall,
  Cricket: cricket,
};
