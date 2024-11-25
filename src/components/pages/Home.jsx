// src/Home.jsx
import { useEffect, useState } from "react";
import { ApiClient } from "../../data/source-api";
import { CONFIG } from "../../globals/config";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import 'lazysizes';
import heroImg from '../../assets/restaurant.jpg';
import { db } from "../../data/db-dexie";

export const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const data = await ApiClient.getRestaurants();
                setRestaurants(data);
                // Save data to IndexedDB
                await db.restaurants.bulkPut(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        const loadRestaurantsFromDB = async () => {
            const storedRestaurants = await db.restaurants.toArray();
            if (storedRestaurants.length > 0) {
                setRestaurants(storedRestaurants); // Get data from IndexedDB
                setLoading(false); // Set loading to false if data is loaded from DB
            } else {
                fetchRestaurants(); // If no data in IndexedDB, fetch from API
            }
        };

        loadRestaurantsFromDB();
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter restaurants based on search query
    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div className="text-gray-500 text-center mt-4 pt-20">Loading restaurants...</div>; // Loading message
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4 pt-20">Error: {error}</div>;
    }

    return (
        <>
            <input
                type="search"
                name="search"
                id="search"
                placeholder="Search restaurant"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out bg-gray-100 shadow-md hover:shadow-lg mt-20 mb-6"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {/* Show hero image only if searchQuery is empty */}
            {!searchQuery && (
                <img className="inset-0 object-cover w-full flex justify-self-center" src={heroImg} alt="Restaurant" />
            )}
            <div className="bg-white p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300" key={restaurant.id}>
                                <div className="h-12 flex items-center justify-center">
                                    <Link className="text-lg font-semibold text-gray-800 hover:text-red-500 transition h-full" to={`/detail/${restaurant.id}`}>
                                        {restaurant.name}
                                    </Link>
                                </div>
                                <picture className="mt-2">
                                    <source srcSet={`${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId}`} type="image/jpeg" media="(max-width: 600px)" />
                                    <source srcSet={`${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}`} type="image/jpeg" media="(min-width: 600px)" />
                                    <source srcSet={`${CONFIG.BASE_IMAGE_URL}/large/${restaurant.pictureId}`} type="image/jpeg" media="(min-width: 1200px)" />
                                    <img className="lazyload w-full h-48 object-cover rounded-lg" data-src={`${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}`} alt={restaurant.name} />
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
                        ))
                    ) : (
                        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center h-48">
                            <img src="/images/no-restaurants.png" alt="No restaurants" className="w-48 h-48 mb-4" />
                            <p className="text-gray-500 text-center">No restaurants found.</p>
                            <p className="text-gray-500 text-center">Try searching for another restaurant or explore our recommendations!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};