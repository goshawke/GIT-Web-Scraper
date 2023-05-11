// components/FilterPanel.tsx
import React, { useState } from 'react';

interface FilterPanelProps {
    onApplyFilters: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {
    const [license, setLicense] = useState('');
    const [language, setLanguage] = useState('');
    const [stars, setStars] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');

    const handleSubmit = () => {
        onApplyFilters({ license, language, stars, lastUpdate });
    };

    return (
        <div className="filter-panel p-4">
            <h3 className="text-xl font-bold mb-4">Filters</h3>
            <div className="flex flex-wrap justify-between gap-4">
                <label className="flex flex-col w-40">
                    License:
                    <select value={license} onChange={(e) => setLicense(e.target.value)} className="w-full bg-white text-black px-2 py-1">
                        <option value="">Select License</option>
                        <option value="MIT">MIT</option>
                        <option value="GPL">GPL</option>
                    </select>
                </label>
                <label className="flex flex-col w-40">
                    Language:
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-white text-black px-2 py-1">
                        <option value="">Select Language</option>
                        <option value="C">C</option>
                        <option value="C#">C#</option>
                    </select>
                </label>
                <label className="flex flex-col w-40">
                    Stars:
                    <input
                        type="text"
                        placeholder=">=100"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        className="bg-white text-black px-2 py-1 w-full"
                    />
                </label>
                <label className="flex flex-col w-40">
                    Last Update:
                    <input
                        type="date"
                        value={lastUpdate}
                        onChange={(e) => setLastUpdate(e.target.value)}
                        className="bg-white text-black px-2 py-1 w-full"
                    />
                </label>
                <button
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 mt-4 rounded text-sm self-start"
                    onClick={handleSubmit}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;
