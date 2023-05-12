import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FilterPanel from '@/components/FilterPanel';

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


  const handleApplyFilters = (filters: any) => {
    // Add the filtering logic here

    // Dummy data for demonstration purposes
    const dummyData: Repo[] = [
      {
        lang: 'C',
        license: 'MIT',
        name: 'repo1',
        owner: 'user1',
        stars: 100,
        updated: '2023-01-10',
      },
      {
        lang: 'C#',
        license: 'MIT',
        name: 'repo2',
        owner: 'user2',
        stars: 50,
        updated: '2023-02-15',
      },
    ];

    // Replace the following code with the actual API call
    setFilteredResults(dummyData.filter((repo) => {
      // Apply filter logic here based on the "filters" object
      // Return true if the repo passes all filters, false otherwise

      let passFilter = true;

      if (filters.language && repo.lang !== filters.language) {
        passFilter = false;
      }

      if (filters.license && repo.license !== filters.license) {
        passFilter = false;
      }

      return passFilter;
    }));
  };

  if (!filteredResults || filteredResults.length === 0) {
    return <div>No results found.</div>;
  }

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

