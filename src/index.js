import { PixabayAPI } from './js/pixabayAPI';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

const pixabayAPI = new PixabayAPI();

const handleSearchPhotos = event => {
  event.preventDefault();

  const searchQuery = event.target.elements['searchQuery'].value.trim();

  pixabayAPI.q = searchQuery;

  pixabayAPI.fetchPhotos(searchQuery).then(data => {
    createCardInfo(data.hits);
  });
};

formEl.addEventListener('submit', handleSearchPhotos);

const createCardInfo = data => {
  console.log(data);
  const cardInfo = data
    .map(
      data => `
    <div class="photo-card">
      <img src=${data.webformatURL} alt="${data.tags}" loading="lazy" />
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

  galleryEl.innerHTML = cardInfo;
};

// const cardInfo = data.hits
//                     .map(data =>
//                         `<div class="photo-card">
//                 <img src=${data.hits.webformatURL} alt=${data.hits.tags} loading="lazy" />
//                 <div class="info">
//                     <p class="info-item">
//                     <b>${data.hits.likes}</b>
//                     </p>
//                     <p class="info-item">
//                     <b>${data.hits.views}</b>
//                     </p>
//                     <p class="info-item">
//                     <b>${data.hits.comments}</b>
//                     </p>
//                     <p class="info-item">
//                     <b>${data.hits.downloads}</b>
//                     </p>
//                 </div>
//                 </div>`).join('');

//                 galleryEl.innerHTML = cardInfo;
