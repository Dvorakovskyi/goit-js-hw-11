export class PixabayAPI {
    #API_KEY = '34887876-89bff92d754edb3a579b9cb65';
    #BASE_URL = 'https://pixabay.com/api/';
    #BASE_PARAMS = {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };
    q = null;

    fetchPhotos = () => {
        const serchParams = new URLSearchParams({
            ...this.#BASE_PARAMS,
            q: this.q,
        })

        return fetch(`${this.#BASE_URL}?key=${this.#API_KEY}&${serchParams}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json();
            }
        )
    }
}