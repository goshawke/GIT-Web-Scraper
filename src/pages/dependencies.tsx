import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Dependency {
    dependency_name: string;
    dependency_version: string;
  }

const Dependencies = () => {
  const router = useRouter();
  const { user, projName } = router.query;
  const [dependencies, setDependencies] = useState<Dependency[]>([]);


  useEffect(() => {
    if (user && projName) {
      fetch(`http://localhost:5000/dependencies?user=${user}&projName=${projName}`)
        .then((response) => response.json())
        .then((data) => setDependencies(data));
    }
  }, [user, projName]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dependencies</h1>
      {dependencies.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Dependency Name</th>
              <th className="border px-4 py-2">Version</th>
            </tr>
          </thead>
          <tbody>
            {dependencies.map((dependency, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{dependency.dependency_name}</td>
                <td className="border px-4 py-2">{dependency.dependency_version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-lg font-semibold">No dependencies found for this repository.</p>
      )}
    </div>
  );
  
  
};

export default Dependencies;
