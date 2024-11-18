
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { username, password, email, phoneNumber, address, role } = data;

    // Validate required fields based on role
    if (!username || !password || !email || !phoneNumber || (role === 'USER' && !address) || (role === 'SELLER' && !data.company)) {
      return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
    }

    // Validate phone number: it should be exactly 10 digits
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return NextResponse.json({ message: 'Phone number must be 10 digits and contain only numbers.' }, { status: 400 });
    }

    // Read the current data from db.json (or fetch it from JSON Server if it's hosted)
    const res = await fetch('http://localhost:5000/' + (role === 'SELLER' ? 'sellers' : 'users'));
    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to fetch current data from server' }, { status: 500 });
    }
    const currentData = await res.json();

    // Generate a new user object
    const newUser = {
      username,
      password,
      email,
      phoneNumber,
      address: role === 'USER' ? address : undefined,
      company: role === 'SELLER' ? data.company : undefined,
      role,
    };

    // Add the new user to the array
    const updatedData = [...currentData, newUser];

    // Send the updated data back to JSON Server to be stored in db.json
    const postRes = await fetch('http://localhost:5000/' + (role === 'SELLER' ? 'sellers' : 'users'), {
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
