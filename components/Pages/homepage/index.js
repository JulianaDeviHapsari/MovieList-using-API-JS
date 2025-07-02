import { fetchApi } from '../../../utils/fetchApi.js';
import Typography from '../../UI/typography/index.js';
import FilterMovie from '../../container/FilterMovie/index.js';
import Footer from '../../container/Footer/index.js';
import MovileList from '../../container/MovieList/index.js';
import Navigation from '../../container/Navigation/index.js';

class Homepage {
  constructor() {
    this.state = {
      count: 0,
      isLoading: true,
      filterType: '',
      filterYear: '',
      movieList: [],
      page: 1,
      movie: [],
      moviePage: 1,
      isLightMode: false,
    };
    this.homeContainer = document.createElement('div');
    this.init();
    window.addEventListener('hashchange', () => {
      if (window.location.hash.split('?')[0] === '') {
        this.init();
      }
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  init() {
    this.getDataMovie();
    this.render();
  }

getDataMovie(pageParam = 1, type = 'get') {
  this.setState({ isLoading: true });
  const page = type === 'get' ? 1 : pageParam;

  // ===============================
  // DATA UPCOMING MOVIE
  // ===============================
  let urlPath = `titles/x/upcoming?limit=4&page=${page}&sort=year.decr`;
  if (this.state.filterType !== '') {
    urlPath += `&titleType=${this.state.filterType}`;
  }
  if (this.state.filterYear !== '') {
    urlPath += `&year=${this.state.filterYear}`;
  }

  fetchApi('GET', urlPath).then((result) => {
    if (type === 'get') {
      this.setState({ movieList: result.results });
    } else {
      this.setState({
        movieList: [...this.state.movieList, ...result.results],
      });
    }
  });

  // ===============================
  // DATA MOVIE BY YEAR (Movie of the year)
  // ===============================
  const pageMovie = type === 'get' ? 1 : pageParam;
  let urlPathMovie = `titles?limit=4&page=${pageMovie}&sort=year.decr`;

  if (this.state.filterYear !== '') {
    urlPathMovie += `&year=${this.state.filterYear}`;
  }
  if (this.state.filterType !== '') {
    urlPathMovie += `&titleType=${this.state.filterType}`;
  }

  fetchApi('GET', urlPathMovie).then((result) => {
    if (type === 'get') {
      this.setState({ movie: result.results });
    } else {
      this.setState({
        movie: [...this.state.movie, ...result.results],
      });
    }
  });

  this.setState({ isLoading: false });
}

  loadMoreMovie(params) {
    this.setState({ isLoading: true });
    if (params === 'upcoming') {
      this.setState({ page: this.state.page + 1 });
      this.getDataMovie(this.state.page + 1, 'load');
    } else {
      this.setState({ moviePage: this.state.moviePage + 1 });
      this.getDataMovie(this.state.moviePage + 1, 'load');
    }
  }

  render() {
    this.homeContainer.innerHTML = '';
    if (this.state.isLightMode) {
      document.body.className = 'body-container-light';
    } else {
      document.body.className = 'body-container';
    }
    const navigation = new Navigation({
      setLightMode: (value) => this.setState({ isLightMode: value }),
      isLightMode: this.state.isLightMode,
    });
    this.homeContainer.appendChild(navigation.render());
    const caption1 = new Typography({ variant: 'h1', children: 'MOVIE WEB' });
    this.homeContainer.appendChild(caption1.render());
    const caption2 = new Typography({
      variant: 'h1',
      children: 'USING VANILLA',
      classname: 'caption2',
    });
    this.homeContainer.appendChild(caption2.render());
    this.homeContainer.appendChild(
      new FilterMovie({
        submitFilter: () => this.getDataMovie(),
        setType: (value) => this.setState({ filterType: value }),
        setYear: (value) => this.setState({ filterYear: value }),
        type: this.state.filterType,
        year: this.state.filterYear,
      }).render()
    );
    const titleUpcoming = new Typography({
      variant: 'h1',
      children: 'Upcoming Movie',
    });
    this.homeContainer.appendChild(titleUpcoming.render());
    this.homeContainer.appendChild(
      new MovileList({
        movieItems: this.state.movieList,
        loadMoreMovie: () => this.loadMoreMovie('upcoming'),
        isLoading: this.state.isLoading,
      }).render()
    );
    const titleThisYear = new Typography({
      variant: 'h1',
      children: 'Movie of the year',
    });
    this.homeContainer.appendChild(titleThisYear.render());
    this.homeContainer.appendChild(
      new MovileList({
        movieItems: this.state.movie,
        loadMoreMovie: () => this.loadMoreMovie('movie'),
        isLoading: this.state.isLoading,
      }).render()
    );
    this.homeContainer.appendChild(new Footer().render());
    return this.homeContainer;
  }
}

export default Homepage;