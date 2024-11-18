// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

const authenticateUser = async (username: string, password: string, role: string) => {
  const url = `http://localhost:5000/${role}s`; // Dynamic URL for 'users' or 'sellers'
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