import { PixabayAPI } from "./js/pixabayAPI";

const formEl = document.querySelector('.search-form');





const pixabayAPI = new PixabayAPI();

const handleSearchPhotos = (event) => {
    event.preventDefault();

    const searchQuery = event.target.elements['searchQuery'].value.trim();

    pixabayAPI.q = searchQuery;

    pixabayAPI.fetchPhotos(searchQuery)
        .then(photos => {
            console.log(photos);
    })
}

formEl.addEventListener('submit', handleSearchPhotos);