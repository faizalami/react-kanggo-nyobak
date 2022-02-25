function getMediaQuery (breakPoint) {
  return `@media screen and (min-width: ${breakPoint}px)`;
}

const mediaQueries = {
  sm: getMediaQuery(640),
  md: getMediaQuery(768),
  lg: getMediaQuery(1024),
  xl: getMediaQuery(1280),
};

export default mediaQueries;
