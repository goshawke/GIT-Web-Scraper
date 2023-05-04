
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Replace the URL with the actual backend service URL once it's ready
  const backendUrl = 'https://backend-service-url.com/api/c-projects';

  try {
    const response = await fetch(backendUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch C projects' });
  }
}
