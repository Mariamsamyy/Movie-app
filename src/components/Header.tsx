import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => setNav(!nav);

    const navItems = [
        { id: 1, text: 'Home', link: "/" },
        { id: 3, text: 'Wishlist', link: "/fav" },
        { id: 5, text: 'Top Rated', link: "/movie/top_rated" },
    ];

    return (
        <header className='bg-[#202020] px-5 py-3 flex justify-between items-center'>
            <nav className="flex w-full">
                <ul className='hidden md:flex items-center gap-4 text-lg'> {}
                    {navItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.link}
                            className={({ isActive }) =>
                                isActive ? 'text-[#01b4e4] font-semibold' : 'text-white hover:text-gray-300'
                            }
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </ul>
                <div className='md:hidden'>
                    <AiOutlineMenu size={30} className='text-white cursor-pointer' onClick={handleNav} />
                </div>
            </nav>
            {nav && (
                <ul className='absolute top-full left-0 w-full bg-[#032541] z-10 flex flex-col items-start py-2 text-lg'> {}
                    {navItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.link}
                            className={({ isActive }) =>
                                isActive ? 'text-[#01b4e4] p-4 w-full text-left font-semibold' : 'text-white p-4 w-full text-left hover:bg-[#034f84]'
                            }
                            onClick={handleNav}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </ul>
            )}
        </header>
    );
};

export default Header;
