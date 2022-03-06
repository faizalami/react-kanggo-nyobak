/* eslint-disable no-restricted-globals */

import 'regenerator-runtime';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import {
  pageCache,
  imageCache,
  staticResourceCache,
  googleFontsCache,
} from 'workbox-recipes';

precacheAndRoute(self.__WB_MANIFEST);

pageCache();

googleFontsCache();

staticResourceCache();

imageCache();

registerRoute(
  ({ url }) => `${url.origin}/` === process.env.API_BASE_URL &&
    !url.pathname.startsWith('/uploads/'),
  new NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'api',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  }),
);
