import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FilterPanel from '@/components/FilterPanel';

// ...interface Repo

interface Repo {
  lang: string;
  license: string;
  name: string;
  owner: string;
  stars: number;
  updated: string;
}

const Results: React.FC = () => {
  const router = useRouter();
  const { results: resultsJSON } = router.query;

  let initialResults: Repo[] = [];
  if (resultsJSON) {
    initialResults = JSON.parse(resultsJSON as string);
  }

  const [results, setResults] = useState<Repo[]>(initialResults);
  const [filteredResults, setFilteredResults] = useState<Repo[]>(initialResults);

  const handleFileStructureClick = (repoOwner: string, repoName: string) => {
    router.push(`/file-structure?user=${repoOwner}&projName=${repoName}`);
  };

  const handleDependenciesClick = (repoOwner: string, repoName: string) => {
    router.push(`/dependencies?user=${repoOwner}&projName=${repoName}`);
  };

  const handleApplyFilters = async (filters: any) => {
    let url = 'http://localhost:5000/filter-results/';

    // Construct the query parameters based on the filters
    const params = new URLSearchParams();
    if (filters.language) params.append('language', filters.language);
    if (filters.license) params.append('license', filters.license);
    if (filters.stars) params.append('stars', filters.stars);

    // Add the query parameters to the URL
    url += `?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setFilteredResults(data);
      } else {
        console.error('An error occurred while fetching data: ', data);
      }
    } catch (error) {
      console.error('An error occurred while fetching data: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="flex flex-col items-center space-y-4 pt-16">
        <h1 className="text-3xl font-bold text-white">Search Results</h1>
        <FilterPanel onApplyFilters={handleApplyFilters} />
        <div className="results w-full">
          <div className="table-container mx-auto px-4 max-w-7xl">
            <table className="table-auto border-collapse border border-gray-800 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-800 px-4 py-2">Repository Owner</th>
                  <th className="border border-gray-800 px-4 py-2">Repository Name</th>
                  <th className="border border-gray-800 px-4 py-2">Language</th>
                  <th className="border border-gray-800 px-4 py-2">License</th>
                  <th className="border border-gray-800 px-4 py-2">Stars</th>
                  <th className="border border-gray-800 px-4 py-2">Creation Date</th>
                  <th className="border border-gray-800 px-4 py-3">Last Updated</th>
                  <th className="border border-gray-800 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((repo: Repo, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : ''}>
                    <td className="border border-gray-800 px-4 py-2">
                      {repo.owner}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      <a
                        href={`https://github.com/${repo.owner}/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {repo.name}
                      </a>
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {repo.lang || 'N/A'}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {repo.license || 'N/A'}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {repo.stars}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {'N/A'}
                    </td>
                    <td className="border border-gray-800 px-4 py-1">
                      {repo.updated || 'N/A'}
                    </td>
                    <td className="border border-gray-800 px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => handleFileStructureClick(repo.owner, repo.name)}
                        className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-sm"
                      >
                        File Structure
                      </button>
                      <button
                        onClick={() => handleDependenciesClick(repo.owner, repo.name)}
                        className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-sm"
                      >
                        Dependencies
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;

