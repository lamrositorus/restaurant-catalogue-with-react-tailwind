import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-stone-400 bg-opacity-70 backdrop-blur-md shadow-lg z-50 transition-all duration-300"> {/* Mengatur navbar agar tetap di atas dengan latar belakang transparan dan blur */}
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link to="/" className="text-3xl font-bold text-stone-700">Restaurant Catalogue</Link> {/* Ubah warna teks menjadi putih */}
                <div className={`hamburger ${menuOpen ? 'open' : ''} md:hidden`} onClick={toggleMenu}>
                    <div className="w-6 h-0.5 bg-white mb-1 transition-transform duration-300 ease-in-out" style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
                    <div className="w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ease-in-out" style={{ opacity: menuOpen ? 0 : 1 }}></div>
                    <div className="w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out" style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
                </div>
                <ul className={`absolute md:static  md:bg-transparent w-full md:w-auto transition-all duration-300 ease-in-out ${menuOpen ? 'top-16 opacity-100 ' :  ' top-[-200px] opacity-0'} md:flex md:opacity-100 md:top-0`}>
                    <li className="md:mr-6">
                        <NavLink to="/" className="block py-2 px-4 h-11 text-stone-700 font-bold hover:text-red-500 transition">Home</NavLink>
                    </li>
                    <li className="md:mr-6">
                        <NavLink to="/about" className="block py-2 px-4 h-11 text-stone-700 font-bold hover:text-red-500 transition">About</NavLink>
                    </li>
                    <li className="md:mr-6">
                        <NavLink to="/favorite" className="block py-2 px-4 h-11 text-stone-700 font-bold hover:text-red-500 transition">Favorite</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};