import React from 'react';
import { useRouter } from 'next/router';

interface Repo {
  name: string;
  url?: string;
  details?: string[];
}

const Results: React.FC = () => {
  const router = useRouter();
  const { results: resultsJSON } = router.query;

  let results: Repo[] = [];
  if (resultsJSON) {
    results = JSON.parse(resultsJSON as string);
  }

  if (!results || results.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="flex flex-col items-center space-y-4 pt-16">
        <h1 className="text-3xl font-bold text-white">Search Results</h1>
        <div className="results w-full">
          <div className="table-container mx-auto px-4 max-w-7xl">
            <table className="table-auto border-collapse border border-gray-800 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-800 px-4 py-2">Repository Name</th>
                  <th className="border border-gray-800 px-4 py-2">Language</th>
                  <th className="border border-gray-800 px-4 py-2">License</th>
                  <th className="border border-gray-800 px-4 py-2">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {results.map((repo: Repo, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : ''}>
                    <td className="border border-gray-800 px-4 py-2">
                      <a
                        href={`https://github.com/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {repo.name}
                      </a>
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {repo.details?.[0] || 'N/A'}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {repo.details?.[1] || 'N/A'}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {repo.details?.[2] || 'N/A'}
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
