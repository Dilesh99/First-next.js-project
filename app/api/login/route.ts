// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const authenticateUser = (username: string, password: string, role: string) => {
  const url = `http://localhost:5000/${role}s`; // Dynamic URL for 'users' or 'sellers'
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.find(
        (user: any) => user.username === username && user.password === password
      );
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await authenticateUser(username, password, role);

    if (user) {
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
