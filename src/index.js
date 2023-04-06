import { PixabayAPI } from './js/pixabayAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let cardInfo = null;

// Бібліотека SimpleLightbox
const simplelightbox = new SimpleLightbox('.gallery a');

// PixabayAPI
const pixabayAPI = new PixabayAPI();

const handleSearchPhotos = event => {
  event.preventDefault();

  cleanInfo();
  
  pixabayAPI.page = 1;

  const searchQuery = event.target.elements['searchQuery'].value.trim();

  pixabayAPI.q = searchQuery;

  pixabayAPI.fetchPhotos().then(data => {
    if (data.hits.length === 0 || searchQuery === '') {
      cleanInfo();

      loadMoreBtnEl.classList.add('is-hidden');

      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);

      createCardInfo(data.hits);

      galleryEl.innerHTML = cardInfo;

      simplelightbox.refresh();

      loadMoreBtnEl.classList.remove('is-hidden');
    }
    
    if (data.hits.length < 40) {
      loadMoreBtnEl.classList.add('is-hidden');
    }
  });
};

const handleLoadMoreClick = () => {
  pixabayAPI.page += 1;

  pixabayAPI.fetchPhotos().then(data => {
    createCardInfo(data.hits);

    galleryEl.insertAdjacentHTML('beforeend', cardInfo);

    simplelightbox.refresh();

    if (data.hits.length < 40) {
      Notify.info('We`re sorry, but you`ve reached the end of search results.');

      loadMoreBtnEl.classList.add('is-hidden');
    }
  })
}

formEl.addEventListener('submit', handleSearchPhotos);
loadMoreBtnEl.addEventListener('click', handleLoadMoreClick);

const createCardInfo = data => {
  cardInfo = data
    .map(
      data => `   
    <div class="photo-card">
    <a class="gallery__item" href="${data.largeImageURL}"> 
      <img class="gallery-img" src=${data.webformatURL} alt="${data.tags}" loading="lazy"/>
    </a>
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
  loadMoreBtnEl.classList.add('is-hidden');

  galleryEl.innerHTML = '';
}