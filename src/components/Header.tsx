import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const navItems = [
        { id: 1, text: 'Home', link: "/" },
        { id: 2, text: 'Movie', link: "/movie" },
        { id: 3, text: 'Wishlist', link: "/fav" },
        { id: 4, text: 'Login', link: "/login" },
        { id: 5, text: 'Top Rated', link: "/movie/top_rated" },
    ];

    return (
        <div className='bg-[#032541] flex justify-between items-center h-16 px-10 text-white w-full'>
            <h1 className='text-2xl font-bold text-[#01b4e4]'>MovieApp</h1>
            <ul className='hidden md:flex'>
                {navItems.map(item => (
                    <NavLink
                        key={item.id}
                        to={item.link}
                        className={({ isActive }) =>
                            isActive ? 'px-4 py-2 rounded text-white bg-[#01b4e4]' : 'px-4 py-2 rounded text-white hover:bg-[#034f84]'
                        }
                    >
                        {item.text}
                    </NavLink>
                ))}
            </ul>
            <div onClick={handleNav} className='md:hidden text-xl cursor-pointer'>
                {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
            </div>
            {nav && (
                <ul className='absolute left-0 top-16 w-full bg-[#032541] z-10'>
                    {navItems.map(item => (
                        <NavLink
                            key={item.id}
                            to={item.link}
                            className={({ isActive }) =>
                                isActive ? 'block p-4 text-white bg-[#01b4e4]' : 'block p-4 text-white hover:bg-[#034f84]'
                            }
                            onClick={() => setNav(false)}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Header;