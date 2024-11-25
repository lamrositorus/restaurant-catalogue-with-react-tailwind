import Dexie from "dexie";

export const db = new Dexie("restaurant-catalogue-db");
db.version(1).stores({
    restaurants: "++id, name, description, pictureId, city, rating",
});

const fetchRestaurants = async () => {
  try {
    const response = await fetch('https://restaurant-api.dicoding.dev/list');
    const data = await response.json();
    await db.restaurants.bulkAdd(data);
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
  }
};

// Call the fetch function when the app is online
window.addEventListener('online', fetchRestaurants);