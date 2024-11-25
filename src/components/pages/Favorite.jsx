import { useEffect, useState } from "react";
import { ApiClient } from '../../data/source-api'; // Pastikan ApiClient memiliki metode untuk mendapatkan detail restoran
import { Link } from "react-router-dom";
import { CONFIG } from "../../globals/config";
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export const Favorite = () => {
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // State untuk menangani loading
    const [error, setError] = useState(null); // State untuk menangani error

    useEffect(() => {
        const likedRestaurants = JSON.parse(localStorage.getItem('likedRestaurants')) || [];
        const fetchFavorites = async () => {
            try {
                const favoriteDetails = await Promise.all(
                    likedRestaurants.map(id => ApiClient.getDetailRestaurant(id))
                );
                setFavoriteRestaurants(favoriteDetails);
            } catch (err) {
                setError("Failed to load favorite restaurants.");
            } finally {
                setLoading(false); // Set loading ke false setelah fetching selesai
            }
        };
        fetchFavorites();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRestaurants = favoriteRestaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="p-6 pt-24">
            <input
                type="text"
                placeholder="Search favorite restaurants..."
                value={searchQuery}
                onChange={handleSearch}
                className="mb-4 p-2 border rounded w-full"
            />
            {loading ? (
                <p className="text-gray-500 pt-20">Loading favorite restaurants...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : filteredRestaurants.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <img src="/images/no-favorites.png" alt="No favorites" className="w-48 h-48 mb-4" />
                    <p className="text-gray-500 text-lg">No favorite restaurants found.</p>
                    <p className="text-gray-500">Try searching for restaurants or explore our recommendations!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300">
                            <Link className="text-lg font-semibold text-gray-800 hover:text-red-500 transition" to={`/detail/${restaurant.id}`}>
                                {restaurant.name}
                            </Link>
                            <picture className="mt-2">
                                <source
                                    srcSet={`${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId}`}
                                    type="image/jpeg" media="(max-width: 600px)"
                                />
                                <source
                                    srcSet={`${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}`}
                                    type="image/jpeg" media="(min-width: 600px)"
                                />
                                <source
                                    srcSet={`${CONFIG.BASE_IMAGE_URL}/large/${restaurant.pictureId}`}
                                    type="image/jpeg" media="(min-width: 1200px)"
                                />
                                <img
                                    className="lazyload w-full h-48 object-cover rounded-lg"
                                    data-src={`${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}`}
                                    alt={restaurant.name}
                                />
                            </picture>
                            <div className="flex items-center text-gray-600 mt-2">
                                <FaMapMarkerAlt className="mr-1" />
                                <p>{restaurant.city}</p>
                            </div>
                            <div className="flex items-center text-yellow-500 font-semibold mt-1">
                                <FaStar className="mr-1" />
                                <p>{restaurant.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};