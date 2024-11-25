// src/About.jsx
import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
    return (
        <div className="container mx-auto px-4 pt-20">            
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <p className="text-lg text-gray-700 mb-4 text-left">
                    Selamat datang di aplikasi restoran kami! Kami sangat mencintai makanan dan berdedikasi untuk membantu Anda menemukan pengalaman bersantap terbaik di daerah Anda.
                </p>
                <p className="text-lg text-gray-700 mb-4 text-left">
                    Misi kami adalah menghubungkan para pecinta kuliner dengan restoran lokal, mempromosikan budaya eksplorasi dan komunitas.
                </p>
            </div>
            <div className="flex justify-center mb-8">
                <Link to={"/learnmore"} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
                    Pelajari Lebih Lanjut
                </Link>
            </div>
            <div className="bg-stone-100 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-stone-700 mb-4">Nilai-Nilai Kami</h2>
                <ul className="list-disc list-inside text-lg text-gray-700">
                    <li className="mb-2 text-left">🌱 Keberlanjutan: Kami percaya pada dukungan terhadap praktik lokal dan berkelanjutan.</li>
                    <li className="mb-2 text-left">🤝 Komunitas: Membangun hubungan yang kuat dengan restoran lokal dan pelanggan kami.</li>
                    <li className="mb-2 text-left">🍽️ Kualitas: Memastikan setiap pengalaman bersantap menjadi tak terlupakan dan menyenangkan.</li>
                    <li className="mb-2 text-left">🌍 Keragaman: Merayakan kekayaan pengalaman kuliner yang tersedia.</li>
                </ul>
            </div>
        </div>
    );
};