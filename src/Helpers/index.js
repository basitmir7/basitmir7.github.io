/**
 * Helper Functions
 */

import { CONSTANTS } from './constants';

export const targetUrl = (url) => {
  if (url) {
    return url.startsWith('http') ? CONSTANTS.httpBlank : CONSTANTS.httpSelf;
  }
};
