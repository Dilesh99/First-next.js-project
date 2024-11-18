import { NextRequest, NextResponse } from 'next/server';

interface User {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  address?: string;
  company?: string;
  role: 'USER' | 'SELLER';
}

// Helper function to authenticate a user
const authenticateUser = async (username: string, password: string, role: 'USER' | 'SELLER'): Promise<User | null> => {
  try {
    const url = `http://localhost:5000/${role}s`; // Dynamic URL for 'users' or 'sellers'
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data from the server.');
    }
    const data: User[] = await res.json();

    return data.find((user) => user.username === username && user.password === password) || null;
  } catch (error) {
    console.error('Error during authentication:', error);
    return null;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { username, password, role }: { username: string; password: string; role: 'USER' | 'SELLER' } = await req.json();

    // Validate input fields
    if (!username || !password || !role) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Authenticate user
    const user = await authenticateUser(username, password, role);

    if (user) {
      return NextResponse.json({ message: 'Login successful', user });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
  }
}
