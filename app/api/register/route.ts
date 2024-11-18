import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { username, password, email, phoneNumber, address, role, company } = data;

    // Validate required fields based on role
    if (!username || !password || !email || !phoneNumber || (role === 'USER' && !address) || (role === 'SELLER' && !company)) {
      return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
    }

    // Validate phone number: it should be exactly 10 digits
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return NextResponse.json({ message: 'Phone number must be 10 digits and contain only numbers.' }, { status: 400 });
    }

    // Determine the API URL based on the environment
    const apiUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : process.env.PROD_API_URL;  // External API endpoint in production

    // Fetch current data from the appropriate endpoint
    const res = await fetch(`${apiUrl}/${role}s`);
    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to fetch current data from server' }, { status: 500 });
    }

    const currentData = await res.json();

    // Check if the username already exists
    const existingUser = currentData.find((user: any) => user.username === username);
    if (existingUser) {
      return NextResponse.json({ message: 'Username already taken.' }, { status: 400 });
    }

    // Create the new user object
    const newUser = {
      username,
      password, // Be sure to hash passwords in production for security
      email,
      phoneNumber,
      address: role === 'USER' ? address : undefined,
      company: role === 'SELLER' ? company : undefined,
      role,
    };

    // Send the new user data to the server
    const postRes = await fetch(`${apiUrl}/${role}s`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!postRes.ok) {
      return NextResponse.json({ message: 'Failed to register user, please try again later.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Registration successful, redirecting to login page' });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
  }
}
