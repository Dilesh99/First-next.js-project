import { NextRequest, NextResponse } from 'next/server';

// Helper function to authenticate the user
const authenticateUser = async (username: string, password: string, role: string) => {
  // Set dynamic API URL based on environment (development vs production)
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.PROD_API_URL;  // Replace with your production API URL

  const url = `${apiUrl}/${role}s`; // Dynamic URL for 'users' or 'sellers'
  const res = await fetch(url);
  const data = await res.json();
  
  return data.find(
    (user: any) => user.username === username && user.password === password
  );
};

export async function POST(req: NextRequest) {
  const { username, password, role } = await req.json();

  if (!username || !password || !role) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const user = await authenticateUser(username, password, role);

  if (user) {
    return NextResponse.json({ message: 'Login successful', user });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
