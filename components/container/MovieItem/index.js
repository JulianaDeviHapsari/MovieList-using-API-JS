import ImageComponent from '../../UI/image/index.js';
import Typography from '../../UI/typography/index.js';

class MovieItem {
  constructor(props) {
    const { movie } = props;
    this.movie = movie;
    this.movieContainer = document.createElement('div');
    this.movieContainer.className = 'movie-card';
    this.movieContainer.onclick = () => {
      window.location.hash = `detail?id=${this.movie.id}`;
    };
  }

  render() {
    const divImage = document.createElement('div');
    divImage.className = 'image-container';
    divImage.appendChild(
      new ImageComponent({
        src: this.movie.primaryImage?.url,
        alt: this.movie.primaryImage?.caption.plainText,
        classname: 'img-movie',
      }).render()
    );
    this.movieContainer.appendChild(divImage);

    const divInfo = document.createElement('div');
    divInfo.className = 'info-container';
    this.movieContainer.appendChild(divInfo);

    divInfo.appendChild(
      new Typography({
        variant: 'h4',
        children: this.movie.titleText?.text,
      }).render()
    );
    divInfo.appendChild(
      new Typography({
        variant: 'h5',
        children: this.movie.releaseYear?.year,
      }).render()
    );

    return this.movieContainer;
  }
}
export default MovieItem;