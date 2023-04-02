import { PixabayAPI } from './js/pixabayAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

let cardInfo = null;

const pixabayAPI = new PixabayAPI();

const handleSearchPhotos = event => {
  event.preventDefault();

  pixabayAPI.page = 1;

  const searchQuery = event.target.elements['searchQuery'].value.trim();

  pixabayAPI.q = searchQuery;

  pixabayAPI.fetchPhotos().then(data => {
    if (data.hits.length === 0 || searchQuery === '') {
      cleanInfo();

      loadMoreBtnEl.classList.add('is-hidden');

      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      console.log(data);
      Notify.success('Done!');

      createCardInfo(data.hits);
      galleryEl.innerHTML = cardInfo;

      loadMoreBtnEl.classList.remove('is-hidden');
    }
  });
};

const handleLoadMoreClick = () => {
  pixabayAPI.page += 1;

  pixabayAPI.fetchPhotos().then(data => {
    createCardInfo(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', cardInfo);
  })
}

formEl.addEventListener('submit', handleSearchPhotos);
loadMoreBtnEl.addEventListener('click', handleLoadMoreClick);

const createCardInfo = data => {
  console.log(data);
 
  cardInfo = data
    .map(
      data => `
    <div class="photo-card">
      <img class="gallery-img" src=${data.webformatURL} alt="${data.tags}" loading="lazy"/>
      <div class="info">
        <p class="info-item">
        <b>Likes ${data.likes}</b>
        </p>
        <p class="info-item">
        <b>Views ${data.views}</b>
        </p>
        <p class="info-item">
        <b>Comments ${data.comments}</b>
        </p>
        <p class="info-item">
        <b>Downloads ${data.downloads}</b>
        </p>
      </div>
    </div>
    `
    )
    .join('');
};

const cleanInfo = () => {
  galleryEl.innerHTML = '';
}