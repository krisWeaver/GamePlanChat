import './index-e806d1f6.js';
export { g as getPlatforms, i as isPlatform } from './ionic-global-9d5c8ee3.js';
import './helpers-fde0057c.js';
export { c as createAnimation } from './animation-8c514e52.js';
export { a as LIFECYCLE_DID_ENTER, c as LIFECYCLE_DID_LEAVE, L as LIFECYCLE_WILL_ENTER, b as LIFECYCLE_WILL_LEAVE, d as LIFECYCLE_WILL_UNLOAD } from './index-4e81e1e8.js';
export { iosTransitionAnimation } from './ios.transition-50904e2c.js';
export { mdTransitionAnimation } from './md.transition-c9069a80.js';
export { g as getTimeGivenProgression } from './cubic-bezier-eea9a7a9.js';
import './gesture-controller-31cb6bb9.js';
export { createGesture } from './index-f49d994d.js';
export { I as IonicSafeString } from './index-9e3fe806.js';
import './hardware-back-button-389954a0.js';
export { m as menuController } from './index-1e47c645.js';
export { b as actionSheetController, a as alertController, l as loadingController, m as modalController, p as pickerController, c as popoverController, t as toastController } from './overlays-46020acc.js';

const setupConfig = (config) => {
  const win = window;
  const Ionic = win.Ionic;
  if (Ionic && Ionic.config && Ionic.config.constructor.name !== 'Object') {
    console.error('ionic config was already initialized');
    return;
  }
  win.Ionic = win.Ionic || {};
  win.Ionic.config = Object.assign(Object.assign({}, win.Ionic.config), config);
  return win.Ionic.config;
};
const getMode = () => {
  const win = window;
  const config = win && win.Ionic && win.Ionic.config;
  if (config) {
    if (config.mode) {
      return config.mode;
    }
    else {
      return config.get('mode');
    }
  }
  return 'md';
};

export { getMode, setupConfig };
