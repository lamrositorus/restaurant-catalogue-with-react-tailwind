// src/LearnMore.jsx
import React from "react";

export const LearnMore = () => {
    return (
        <div className="container mx-auto px-4 pt-20">
            <h1 className="text-5xl font-bold text-center text-stone-800 mb-12">Learn More About Us</h1>
            
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-4xl font-semibold text-stone-700 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Our mission is to connect food lovers with local restaurants, promoting a culture of exploration and community.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-slate-600 text-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h2 className="text-3xl font-semibold mb-4">Features</h2>
                    <ul className="list-disc list-inside">
                        <li className="mb-2 text-left">🍽️ Discover a wide variety of restaurants based on your preferences.</li>
                        <li className="mb-2 text-left">🔍 Use our powerful search functionality to find exactly what you’re looking for.</li>
                        <li className="mb-2 text-left">📝 Read and write reviews to help others make informed dining choices.</li>
                        <li className="mb-2 text-left">❤️ Save your favorite restaurants for easy access later.</li>
                    </ul>
                </div>
                <div className="bg-stone-100 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-stone-700 mb-4">User  Testimonials</h2>
                    <blockquote className="border-l-4 border-red-500 pl-4 italic text-lg text-gray-700 mb-4">
                        This app helped me find the best sushi place in town! Highly recommend!
                    </blockquote>
                    <blockquote className="border-l-4 border-red-500 pl-4 italic text-lg text-gray-700 mb-4">
                        I love how easy it is to find new restaurants. The reviews are super helpful!
                    </blockquote>
                </div>
            </div>

            <div className="bg-stone-100 p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-4xl font-semibold text-stone-700 mb-6">Contact Us</h2>
                <p className="text-lg text-gray-700 mb-4">
                    For any inquiries or support, please reach out to us at 
                    <a href="mailto:lamrostr03@gmail.com" className="text-red-500 underline"> lamrostr03@gmail.com</a>.
                    <br />
                    <a className="text-red-500 hover:underline" href="https://github.com/lamrositorus"> Check out our GitHub page for more information.</a>
                </p>
                <p className="text-sm text-gray-500">
                    We&apos;re here to help you find the best dining experiences!
                </p>
            </div>
        </div>
    );
};