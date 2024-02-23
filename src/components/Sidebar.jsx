import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';
import { links } from '../assets/constants';
import { HiOutlineMenu } from 'react-icons/hi';

const NavLinks = ({ handleClick }) => (
    <div className="mt-10">
        {links.map((link) => (
            <NavLink
                key={link.name}
                className={({ isActive }) => `mb-8 flex flex-row items-center justify-start text-sm font-medium text-black hover:text-[#ffb54c] ${isActive && 'text-[#ffb54c]'}`}
                to={link.to}
                onClick={() => handleClick && handleClick()}
                end
            >
                <link.icon className="mr-2 h-6 w-6"/>
                {link.name}
            </NavLink>
        ))}
    </div>
);

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="md:flex hidden flex-col w-[240px] pt-2 pb-2 px-4 bg-[#ef6902]">
                <img src={logo} alt="logo" className="h-14 w-full object-contain"/>
                <NavLinks/>
            </div>

            <div className="absolute top-6 right-3 block md:hidden">
                {isMobileMenuOpen
                    ? <RiCloseLine onClick={() => setIsMobileMenuOpen(false)}
                                   className="mr-2 h-6 w-6 cursor-pointer text-white"/>
                    : <HiOutlineMenu onClick={() => setIsMobileMenuOpen(true)}
                                     className="mr-2 h-6 w-6 cursor-pointer text-white"/>}
            </div>

            <div
                className={`absolute top-0 h-screen w-2/3 bg-gradient-to-br from-white to-[#ef6902] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${isMobileMenuOpen ? 'left-0' : '-left-full'}`}>
                <img src={logo} alt="logo" className="h-14 w-full object-contain"/>
                <NavLinks handleClick={() => setIsMobileMenuOpen(false)}/>
            </div>
        </>
    );
};

export default Sidebar;
