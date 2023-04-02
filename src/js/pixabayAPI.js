export class PixabayAPI {
    #API_KEY = '34887876-89bff92d754edb3a579b9cb65';
    #BASE_URL = 'https://pixabay.com/api/';
    #BASE_PARAMS = {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
    };
    q = null;
    page = 1;

    fetchPhotos = async () => {
        const serchParams = new URLSearchParams({
            ...this.#BASE_PARAMS,
            q: this.q,
            page: this.page,
        })

        try {
            const response = await fetch(`${this.#BASE_URL}?key=${this.#API_KEY}&${serchParams}`)

            if (!response.ok) {
                throw new Error(response.status)
            }

            return await response.json();

        } catch (error) {}       
    }
}