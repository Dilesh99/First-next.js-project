"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('SELLER');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Authentication function
  const authenticateUser = async () => {
    const role = selectedRole.toLowerCase();
    const url = `http://localhost:5000/${role}s`; // Adjust the endpoint based on role (users or sellers)

    try {
      const response = await fetch(url);
      const users = await response.json();

      const user = users.find(
        (user: any) => user.username === username && user.password === password
      );

      if (user) {
        // If user found, redirect based on role
        if (role === 'user') {
          router.push('/'); // Redirect to User Dashboard (adjust as needed)
        } else {
          router.push('/dashboard'); // Redirect to Seller Dashboard (adjust as needed)
        }
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('Failed to authenticate. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    authenticateUser();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-md md:max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row h-auto md:h-[70vh]">
        {/* Image Section */}
        <div className="w-full h-48 md:h-auto relative md:w-1/2">
          <Image
            src="/img/sigiriya3.jpg"
            alt="Heritage"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 object-cover md:hidden"
          />
          <Image
            src="/img/sigiriya3.jpg"
            alt="Heritage"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 object-cover hidden md:block"
            style={{
              clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 w-full p-4 md:p-10 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-4 sm:mb-6 space-x-2">
              <a href="/sellerlogin">
                <button
                  onClick={() => setSelectedRole('SELLER')}
                  className={`${
                    selectedRole === 'SELLER' ? 'bg-herit text-white' : 'text-herit'
                  } py-2 px-3 sm:px-4 rounded-md bg-cream transition-colors duration-300`}
                >
                  SELLER
                </button>
              </a>
              <a href="/userlogin">
                <button
                  onClick={() => setSelectedRole('USER')}
                  className={`${
                    selectedRole === 'USER' ? 'bg-herit text-white' : 'text-herit'
                  } py-2 px-3 sm:px-4 rounded-md shadow-md bg-cream transition-colors duration-300 -translate-x-3 sm:-translate-x-6`}
                >
                  USER
                </button>
              </a>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-right text-herit">Heritage Link</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-right text-red-800 mb-3 sm:mb-5">Seller Login</p>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center mb-3">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="font-semibold mb-1 sm:mb-2 text-herit">Username</label>
                <input
                  type="text"
                  className="w-full px-2 sm:px-3 py-3 sm:py-4 text-herit font-semibold border-green-50 bg-cream rounded focus:outline-none focus:border-herit focus:ring-2 focus:ring-herit"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold mb-1 sm:mb-2 text-herit">Password</label>
                <input
                  type="password"
                  className="w-full px-2 sm:px-3 py-3 sm:py-4 text-herit font-semibold border-green-50 bg-cream rounded focus:outline-none focus:border-herit focus:ring-2 focus:ring-herit"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex sm:flex-row justify-between items-center mb-4 sm:mb-6">
                <div className="flex space-x-2 mb-4 sm:mb-0">
                  <button className="bg-white rounded-full p-1 sm:p-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image src="/img/google.png" alt="Google" width={20} height={20} />
                  </button>
                  <button className="bg-white rounded-full p-1 sm:p-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image src="/img/facebook.png" alt="Facebook" width={20} height={20} />
                  </button>
                </div>
                <button
                  type="submit"
                  className="py-2 px-3 sm:px-4 rounded-md bg-herit text-white hover:bg-opacity-80 transition-colors duration-300"
                >
                  LOGIN
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <p>
                If you don't have an account,{' '}
                <a href="/sellerregistration" className="text-primary font-semibold hover:underline">
                  please register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
