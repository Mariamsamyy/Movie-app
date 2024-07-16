import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CoverProps {
    title: string;
    description: string;
    catchyPhrase: string;
    headerImage: string;
    showSearch: boolean;
    showHeaderImage: boolean;
    children?: React.ReactNode;
}

const Cover: React.FC<CoverProps> = ({
    title,
    description,
    catchyPhrase,
    showSearch,
}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        navigate(`/search/movie`, { state: { query: searchQuery } });
    };

    return (
        <div className="relative h-80 bg-cover bg-center text-white"
             style={{
                 backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://www.plex.tv/wp-content/uploads/2024/01/Watch-Free-Hero-2048x1152-3-1024x576.png")`
             }}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <p className="text-xl mb-2">{description}</p>
                    <em className="block mb-4 text-lg">{catchyPhrase}</em>
                    {showSearch && (
                        <div className="mt-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for a movie, tv show, person..."
                                    className="w-full pl-4 pr-10 py-3 rounded-full text-black focus:outline-none"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cover;
