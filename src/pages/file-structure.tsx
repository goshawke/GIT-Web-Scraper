import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FileStructureItem {
  URL: string;
  content_name: string;
  content_type: string;
  content_updated: string;
}

function transformPath(url: string) {
  const urlArray = url.split('/');
  const user = urlArray[1];
  const projName = urlArray[2];
  const treeIndex = urlArray.indexOf('tree');

  if (treeIndex === -1) return { user, projName, fullRoute: url };

  const fullRoute = urlArray.slice(treeIndex).join('-');
  return { user, projName, fullRoute };
}

const FileStructure = () => {
  const router = useRouter();
  const { user, projName, fullRoute } = router.query;
  const [fileStructure, setFileStructure] = useState<FileStructureItem[]>([]);

  useEffect(() => {
    if (user && projName) {
      fetch(`http://localhost:5000/file-structure?user=${user}&projName=${projName}&fullRoute=${fullRoute || ''}`)
        .then((response) => response.json())
        .then((data) => setFileStructure(data));
    }
  }, [user, projName, fullRoute]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">File Structure</h1>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">URL</th>
            <th className="py-3 px-6 text-left">Content Name</th>
            <th className="py-3 px-6 text-left">Content Type</th>
            <th className="py-3 px-6 text-left">Content Updated</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {fileStructure.map((item, index) => {
            const { user, projName, fullRoute } = transformPath(item.URL);
            return (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <Link href={`/file-structure?user=${user}&projName=${projName}&fullRoute=${encodeURIComponent(fullRoute)}`}>
                    {item.URL}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left">{item.content_name}</td>
                <td className="py-3 px-6 text-left">{item.content_type}</td>
                <td className="py-3 px-6 text-left">{item.content_updated}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileStructure;
