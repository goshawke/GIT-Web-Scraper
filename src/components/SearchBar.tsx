import React, { useState } from 'react';



interface Props {
  onSearch: (query: string) => void;
  defaultLanguage?: string;
}

const SearchBar: React.FC<Props> = ({ onSearch, defaultLanguage = '' }) => {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState(defaultLanguage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(`${search}+language:${language}`);
  };

  const handleLanguageClick = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border-2 border-white rounded-md w-full focus:outline-none focus:border-white bg-transparent text-white placeholder-white placeholder-opacity-50"
          placeholder="Search GitHub repositories"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-white text-blue-500 font-bold rounded-md hover:bg-blue-200"
        >
          Search
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => handleLanguageClick('c')}
          className={`px-4 py-2 rounded-md hover:bg-blue-200 ${
            language === 'c' ? 'bg-white text-blue-500 font-bold' : ''
          }`}
        >
          C
        </button>
        <button
          type="button"
          onClick={() => handleLanguageClick('c++')}
          className={`px-4 py-2 rounded-md hover:bg-blue-200 ${
            language === 'c++' ? 'bg-white text-blue-500 font-bold' : ''
          }`}
        >
          C++
        </button>
        <button
          type="button"
          onClick={() => handleLanguageClick('c#')}
          className={`px-4 py-2 rounded-md hover:bg-blue-200 ${
            language === 'c#' ? 'bg-white text-blue-500 font-bold' : ''
          }`}
        >
          C#
        </button>
      </div>
      {language && (
        <div className="text-white font-bold mt-2">
          Selected language: {language}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
