import { useNavigate } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const Searchbar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`);
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-200 focus-within:text-gray-300">
            <label htmlFor="search-field" className="sr-only">
                Search all songs
            </label>
            <div className="flex flex-row justify-start items-center">
                <FiSearch aria-hidden="true" className="w-5 h-5 ml-4"/>
                <input
                    name="search-field"
                    autoComplete="off"
                    id="search-field"
                    className="flex-1 bg-transparent border-none placeholder-gray-300 outline-none text-base text-white p-4"
                    placeholder="Search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </form>
    );
};

export default Searchbar;
