import { useEffect, useState } from 'react';
import { ApiClient } from '../../data/source-api';
import { CONFIG } from '../../globals/config';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa'; // Import ikon hati
import Swal from 'sweetalert2';

export const Detail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [isLiked, setIsLiked] = useState(false); // State untuk status like


    useEffect(() => {
        if (!id) {
            setError('No ID provided');
            return;
        }
        const fetchRestaurantDetail = async () => {
            try {
                const data = await ApiClient.getDetailRestaurant(id);
                setRestaurant(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchRestaurantDetail();
    }, [id]);

    useEffect(() => {
        const likedRestaurants = JSON.parse(localStorage.getItem('likedRestaurants')) || [];
        setIsLiked(likedRestaurants.includes(id)); // Cek apakah restoran sudah disukai
    }, [id]);

    const handleAddReview = async (e) => {
        e.preventDefault();
        // Tampilkan SweetAlert untuk konfirmasi pengiriman
    const { isConfirmed } = await Swal.fire({
        title: 'Confirm Submission',
        text: "Are you sure you want to submit your review?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!'
    });

    if (isConfirmed) {
        try {
            const response = await ApiClient.addReviewRestaurant(id, name, review);
            const updatedCustomerReviews = response.customerReviews;
            setRestaurant((prev) => ({
                ...prev,
                customerReviews: updatedCustomerReviews,
            }));
            setName('');
            setReview('');
        } catch (err) {
            setError(err.message);
            console.log('Error adding review', err);
        }
    }
    };

    const handleLike = () => {
        const likedRestaurants = JSON.parse(localStorage.getItem('likedRestaurants')) || [];
        if (likedRestaurants.includes(id)) {
            // Jika sudah disukai, hapus dari daftar
            const updatedLikes = likedRestaurants.filter(restaurantId => restaurantId !== id);
            localStorage.setItem('likedRestaurants', JSON.stringify(updatedLikes));
            setIsLiked(false);
        } else {
            // Jika belum disukai, tambahkan ke daftar
            likedRestaurants.push(id);
            localStorage.setItem('likedRestaurants', JSON.stringify(likedRestaurants));
            setIsLiked(true);
        }
    };

    if (error) {
        return <div className="text-red-500 text-center pt-20">Error: {error}</div>;
    }

    if (!restaurant) {
        return <div className="text-gray-500 text-center pt-20">Loading...</div>;
    }

    return (
        <div className="pt-20 p-6 bg-gray-200 text-gray-800 rounded-lg shadow-lg">
            <button onClick={handleLike} className="flex items-center mt-4">
                <FaHeart className={`mr-2 ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
                <span className="font-semibold">{isLiked ? 'Unlike' : 'Like'}</span>
            </button>
            <picture className="mb-4">
                <source srcSet={`${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId}`} type="image/jpeg" media="(max-width: 600px)" />
                <source srcSet={`${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}`} type="image/jpeg" media="(min-width: 600px)" />
                <source srcSet={`${CONFIG.BASE_IMAGE_URL}/large/${restaurant.pictureId}`} type="image/jpeg" media="(min-width: 1200px)" />
                <img className='w-9/12 flex justify-self-center object-cover rounded-2xl shadow-lg' data-src={`${CONFIG.BASE_IMAGE_URL}/medium/${restaurant.pictureId}`} alt={restaurant.name} />
            </picture>
            <p className='mt-4 text-gray-700 text-lg text-justify'>{restaurant.description}</p>
            <div className='mt-4 flex justify-between items-center text-gray-600'>
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <p className='font-semibold'><strong>Location:</strong> {restaurant.city}, {restaurant.address}</p>
                </ div>
                <div className="flex items-center">
                    <FaStar className="mr-2 text-yellow-500" />
                    <p className='font-semibold'><strong>Rating:</strong> {restaurant.rating}</p>
                </div>
            </div>

            <h2 className='mt-6 text-3xl font-semibold text-gray-900 border-b-2 border-gray-400 pb-2'>Menus</h2>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <h3 className='text-xl font-semibold text-gray-800'>Foods</h3>
                    <ul className='mt-2 list-none'>
                        {restaurant.menus.foods.map((food, index) => (
                            <li key={index} className='mt-2 bg-gray-100 p-3 rounded-lg shadow transition-transform transform hover:scale-105'>
                                {food.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <h3 className='text-xl font-semibold text-gray-800'>Drinks</h3>
                    <ul className='mt-2 list-none'>
                        {restaurant.menus.drinks.map((drink, index) => (
                            <li key={index} className='mt-2 bg-gray-100 p-3 rounded-lg shadow transition-transform transform hover:scale-105'>
                                {drink.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <h2 className='mt-6 text-3xl font-semibold text-gray-900 border-b-2 border-gray-400 pb-2'>Customer Reviews</h2>
            {restaurant.customerReviews.map((review, index) => (
                <div key={index} className='mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow'>
                    <p className='text-gray-800 text-left font-bold'>{review.name}</p>
                    <p className='text-gray-600 text-left'>{review.review}</p>
                    <p className='text-gray-500 text-left'><em>{review.date}</em></p>
                </div>
            ))}

            <h2 className='mt-6 text-3xl font-semibold text-gray-900 border-b-2 border-gray-400 pb-2'>Add a Review</h2>
            <form onSubmit={handleAddReview} className='mt-4'>
                <input
                    type='text'
                    placeholder='Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full h-12 p-2 mb-2 bg-gray-100 text-gray-800 rounded-lg'
                    required
                />
                <textarea
                    placeholder='Your Review'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className='w-full p-2 mb-2 bg-gray-100 text-gray-800 rounded-lg'
                    required
                />
                <button type='submit' className='w-full h-12 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors'>
                    Submit Review
                </button>
            </form>
        </div>
    );
};