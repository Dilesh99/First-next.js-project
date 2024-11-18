import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Type for user data
interface User {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  address?: string;
  company?: string;
  role: 'USER' | 'SELLER';
}

interface DbData {
  users: User[];
  sellers: User[];
}

// GET method: Fetch users
export async function GET() {
  try {
    // Path to the db.json file
    const dbPath = path.join(process.cwd(), 'public', 'db.json');
    const data = fs.readFileSync(dbPath, 'utf-8');
    const jsonData: DbData = JSON.parse(data); // Type the JSON data to match DbData structure
    return NextResponse.json(jsonData.users); // Returning the users array
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Failed to retrieve data.' }, { status: 500 });
  }
}

// POST method: Register a new user
export async function POST(request: Request) {
  try {
    const data: User = await request.json();
    const { username, password, email, phoneNumber, address, role } = data;

    // Validate required fields
    if (!username || !password || !email || !phoneNumber || (role === 'USER' && !address) || (role === 'SELLER' && !data.company)) {
      return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
    }

    // Validate phone number
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return NextResponse.json({ message: 'Phone number must be 10 digits and contain only numbers.' }, { status: 400 });
    }

    // Read the current data from db.json
    const dbPath = path.join(process.cwd(), 'public', 'db.json');
    const currentData: DbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Generate new user
    const newUser: User = {
      username,
      password,
      email,
      phoneNumber,
      address: role === 'USER' ? address : undefined,
      company: role === 'SELLER' ? data.company : undefined,
      role,
    };

    // Add the new user to the array
    const updatedData = { ...currentData, users: [...currentData.users, newUser] };

    // Write the updated data back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
  }
}
