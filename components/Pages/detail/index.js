import Typography from '../../UI/typography/index.js';
import { fetchApi } from '../../../utils/fetchApi.js';
import Image from '../../UI/image/index.js';
import Navigation from '../../container/Navigation/index.js';
import Footer from '../../container/Footer/index.js';
import Skeleton from '../../UI/Skeleton/index.js';  


class Detailpage {
  constructor() {
    this.state = {
      selectedItem: {},
      movieRate: {},
      isLoading: true,
      isLightMode: false,
    };
    this.detailContainer = document.createElement('div');
    this.init();
    window.addEventListener('hashchange', () => {
      if (window.location.hash.split('?')[0] === '#detail') {
        this.init();
      }
    });
  }
  init() {
    this.getDetailMovie();
    this.render();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

getDetailMovie() {
  const queryString = window.location.hash.split('=')[1];
  const urlPath = `titles/${queryString}`;

  fetchApi('GET', urlPath).then((result) => {

    this.setState({ selectedItem: result.results });    
    console.log('🟡 Detail API result:', result.results);
  });

  const urlPathRating = `titles/${queryString}/ratings`;
  fetchApi('GET', urlPathRating).then((result) => {
    this.setState({ movieRate: result.results, isLoading: false }); // set loading false setelah data rating diterima
  });
}



  render() {
    this.detailContainer.innerHTML = '';
    const navigation = new Navigation({
      setLightMode: (value) => this.setState({ isLightMode: value }),
      isLightMode: this.state.isLightMode,
    });
    this.detailContainer.appendChild(navigation.render());
if (
  !this.state.isLoading &&
  this.state.selectedItem &&
  Object.keys(this.state.selectedItem).length > 0 &&
  this.state.movieRate &&
  Object.keys(this.state.movieRate).length > 0
)

{
      this.detailContainer.appendChild(
new Image({
  src: this.state.selectedItem.primaryImage?.url || 'https://via.placeholder.com/300x450?text=No+Image',
  alt: this.state.selectedItem.primaryImage?.caption?.plainText || this.state.selectedItem.originalTitleText?.text || 'No Title',
  classname: 'img-detail-cover',
})
.render()
      );
      const contentContainer = document.createElement('div');
      contentContainer.className = 'content-container';
      contentContainer.appendChild(
new Image({
  src: this.state.selectedItem.primaryImage?.url || 'https://via.placeholder.com/300x450?text=No+Image',
  alt: this.state.selectedItem.primaryImage?.caption?.plainText || this.state.selectedItem.originalTitleText?.text || 'No Title',
  classname: 'img-detail',
})
.render()
      );
      const contentDetail = document.createElement('div');
      contentDetail.className = 'content-detail';
      contentDetail.appendChild(
        new Typography({
          variant: 'h1',
          children: `Title: ${this.state.selectedItem.originalTitleText.text}`,
        }).render()
      );
      contentDetail.appendChild(
        new Typography({
          variant: 'h2',
          children: `Release Year: ${this.state.selectedItem.releaseYear.year}`,
        }).render()
      );
      contentDetail.appendChild(
        new Typography({
          variant: 'h2',
          children: `Rating: ${this.state.movieRate.averageRating}`,
        }).render()
      );
      contentDetail.appendChild(
        new Typography({
          variant: 'h2',
          children: `Voters Count: ${this.state.movieRate.numVotes}`,
        }).render()
      );
      contentContainer.appendChild(contentDetail);
      this.detailContainer.appendChild(contentContainer);
    } else {
      this.detailContainer.appendChild(
        new Skeleton({ width: '100%', height: '600px' }).render()
      );
      const contentContainer = document.createElement('div');
      contentContainer.className = 'content-container';
      contentContainer.appendChild(
        new Skeleton({ width: '300px', height: '300px' }).render()
      );
      const contentDetail = document.createElement('div');
      contentDetail.className = 'content-detail';
      contentDetail.appendChild(
        new Skeleton({ width: '300px', height: '60px' }).render()
      );
      contentDetail.appendChild(
        new Skeleton({ width: '300px', height: '60px' }).render()
      );
      contentContainer.appendChild(contentDetail);
      this.detailContainer.appendChild(contentContainer);
    }
    this.detailContainer.appendChild(new Footer().render());
    return this.detailContainer;
    }
  }




export default Detailpage;