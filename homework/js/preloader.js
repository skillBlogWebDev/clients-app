import {
  svgPreloadMain
} from "./svg.js";

export const createPreloader = () => {
  const preloadBlock = document.createElement('div');
  const preloadCircle = document.createElement('span');
  preloadBlock.classList.add('preloader');
  preloadCircle.id = 'loader';

  preloadCircle.innerHTML = svgPreloadMain;

  preloadBlock.append(preloadCircle);

  return preloadBlock;
}
