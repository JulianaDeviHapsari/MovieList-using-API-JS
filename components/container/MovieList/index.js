import Button from "../../UI/Button/index.js";
import MovieItem from '../../container/MovieItem/index.js';
import Loader from '../../UI/Loader/index.js';

class MovileList {
  constructor(props) {
    const { movieItems, loadMoreMovie, isLoading } = props;
    this.movieItems = movieItems;
    this.movieContainer = document.createElement('div');
    this.movieWrapper = document.createElement('div');
    this.movieContainer.className = 'movie-list';
    this.loadMoreMovie = loadMoreMovie;
    this.isLoading = isLoading;
  }

  render() {
    this.movieItems.map((movie) => {
      const movieTitle = new MovieItem({
        movie,
      });
      this.movieContainer.appendChild(movieTitle.render());
    });
    this.movieWrapper.appendChild(this.movieContainer);
    if (this.movieItems.length > 0) {
      this.movieWrapper.appendChild(
        new Button({
          text: this.isLoading ? new Loader().render() : 'Load More',
          variant: 'primary',
          onclick: () => this.loadMoreMovie(),
          className: 'load-more',
          disabled: this.isLoading,
        }).render()
      );
    }
    return this.movieWrapper;
  }
}
export default MovileList;