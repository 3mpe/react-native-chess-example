import Home from '../pages/Home';

const routes = [
  {
    component: Home,
    name: 'Home',
    initialRouteName: true,
  },
];

/**
 * @typedef {Object} RoutesNamesType
 * @property {string} Home
 * // Diğer route'lar için ekleyin...
 */

/** @type {RoutesNamesType} */
export const RoutesNames = routes.reduce((acc, route) => {
  acc[route.name] = route.name;
  return acc;
}, {});

export default routes;
