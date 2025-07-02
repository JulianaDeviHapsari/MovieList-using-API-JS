import Homepage from '../components/Pages/homepage/index.js';
import Detailpage from '../components/Pages/detail/index.js';
import Aboutpage from '../components/Pages/about/index.js';
import NotFound from '../components/Pages/notFound/index.js';

const ROUTES = {
    //home document.getElementById('app').appendChild(Hompage.render());
    home : new Homepage().render(),
    detail : new Detailpage().render(),
    about : new Aboutpage().render(),
   _404 : new NotFound().render()
};
export const route = (hash) => {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = '';
  const hashRoute = hash === '' ? 'home' : hash.split('?')[0];
  const isAvailablePage = ROUTES.hasOwnProperty(hashRoute);
  if (isAvailablePage) {
    appContainer.appendChild(ROUTES[hashRoute]);
  } else {
    appContainer.appendChild(ROUTES['_404']);
  }
};