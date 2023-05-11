import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/router';


const Home: React.FC = () => {
  const [results, setResults] = useState<
    Array<{ name: string; url?: string; details?: string[] }>
  >([]);
  
  const router = useRouter();

  const searchRepositories = async (query: string, language: string) => {
    try {
      const term = query.trim() ? query : 'parse';
      const response = await fetch(
        `http://localhost:5000/search-results/${term}?lang=${language}`,
      );
      const data = await response.json();
      setResults(data);
  
      router.push({
        pathname: '/results',
        query: { results: JSON.stringify(data) },
      });
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };
  
  
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-600 text-white">
      <main className="flex flex-col items-center space-y-4 pt-16">
        <h1 className="text-6xl font-bold text-white">Git Search</h1>
        <SearchBar onSearch={searchRepositories} />

        <div className="results">
          {results.map((repo, index) => (
            <div key={index}>
              <h2>
                {repo.url ? (
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                ) : (
                  repo.name
                )}
              </h2>
              <p>{repo.details && repo.details.join(', ')}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
