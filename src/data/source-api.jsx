import { API_ENDPOINT } from "../globals/api-endpoint";

export class ApiClient {
    static async getRestaurants() {
        const response = await fetch(API_ENDPOINT.RESTAURANT);
        if (!response.ok) {
            throw new Error('Failed to fetch restaurants.');
        }
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async getDetailRestaurant(id) {

        const response = await fetch(API_ENDPOINT.DETAIL(id));
        if (!response.ok) {
            throw new Error('Failed to fetch restaurant details.');
        }
        const responseJson = await response.json();
        return responseJson.restaurant;
    }

    static async addReviewRestaurant(id, name, review) {
        const response = await fetch(API_ENDPOINT.REVIEW, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({
                id: id,
                name: name,
                review: review
            })
        })
        if (!response.ok) {
            throw new Error('Failed to add review.');
        }
        return await response.json();
    }

    static async searchRestaurants(query) {
        const response = await fetch(API_ENDPOINT.SEARCH + query);
        if (!response.ok) {
            throw new Error('Failed to search restaurants.')
        }
        const responseJson = await response.json();
        return responseJson.restaurants;
    }
}