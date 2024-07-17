import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => setNav(!nav);

    const navItems = [
        { id: 1, text: 'Home', link: "/" },
        // { id: 2, text: 'Movie', link: "/movie" },
        { id: 3, text: 'Wishlist', link: "/fav" },
        // { id: 4, text: 'Login', link: "/login" },
        { id: 5, text: 'Top Rated', link: "/movie/top_rated" },
    ];
    return (
    <React.Fragment>
            <header className='bg-[#202020] px-5 py-3 flex justify-between items-center'>
            <nav>
                <ul className='hidden md:flex items-center gap-4'>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.link}
                            className={({ isActive }) => isActive ? 'text-[#01b4e4] underline' : 'text-white'}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </ul>
                <div className='md:hidden'>
                    <AiOutlineMenu size={30} className='text-white cursor-pointer' onClick={handleNav} />
                </div>
                {nav && (
                    <ul className='absolute top-full left-0 w-full bg-[#032541] z-10 flex flex-col items-start py-2'>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.link}
                                className={({ isActive }) => isActive ? 'text-[#01b4e4] p-4 w-full text-left' : 'text-white p-4 w-full text-left hover:bg-[#034f84]'}
                                onClick={handleNav}
                            >
                                {item.text}
                            </NavLink>
                        ))}
                    </ul>
                )}
            </nav>
        </header>
    </React.Fragment>
    );
};

export default Header;
