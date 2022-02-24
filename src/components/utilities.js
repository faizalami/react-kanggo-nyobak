import { css } from '@emotion/react';

const m = {};
const p = {};

const spacePosition = {
  a: '',
  t: '-top',
  b: '-bottom',
  l: '-left',
  r: '-right',
};

for (let i = 0; i <= 9; i += 1) {
  Object.keys(spacePosition).forEach(key => {
    if (i === 9) {
      m[`${key}Auto`] = css`margin${spacePosition[key]}: auto`;
    } else {
      m[`${key}${i}`] = css`margin${spacePosition[key]}: ${i * 0.25}rem`;
      p[`${key}${i}`] = css`padding${spacePosition[key]}: ${i * 0.25}rem`;
    }
  });
  if (i === 9) {
    m[`xAuto`] = css`
      margin-left: auto;
      margin-right: auto;
    `;
    m[`yAuto`] = css`
      margin-top: auto;
      margin-bottom: auto;
    `;
  } else {
    m[`x${i}`] = css`
      margin-left: ${i * 0.25}rem;
      margin-right: ${i * 0.25}rem;
    `;
    m[`y${i}`] = css`
      margin-top: ${i * 0.25}rem;
      margin-bottom: ${i * 0.25}rem;
    `;
    p[`x${i}`] = css`
      padding-left: ${i * 0.25}rem;
      padding-right: ${i * 0.25}rem;
    `;
    p[`y${i}`] = css`
      padding-top: ${i * 0.25}rem;
      padding-bottom: ${i * 0.25}rem;
    `;
  }
}

export { m, p };
