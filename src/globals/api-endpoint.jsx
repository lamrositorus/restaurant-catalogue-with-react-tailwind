import { CONFIG } from "./config";

export const API_ENDPOINT = {
    RESTAURANT : `${CONFIG.BASE_URL}list`,
    DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
    LIKE: (id) => `${CONFIG.BASE_URL}like/${id}`,
    REVIEW:`${CONFIG.BASE_URL}review`,
    SEARCH: `${CONFIG.BASE_URL}search`,
};