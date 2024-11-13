"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState<'SELLER' | 'USER'>('USER');
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Regular expression for phone number validation (10 digits)
  const phoneNumberRegex = /^\d{10}$/;

  const handleNextStep = () => {
    if (formStep === 0) {
      if (!formData.username || !formData.password || !formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          username: !formData.username ? 'Username is required' : '',
          password: !formData.password ? 'Password is required' : '',
          confirmPassword: !formData.confirmPassword ? 'Confirm Password is required' : '',
        }));
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match',
        }));
        return;
      }
    } else if (formStep === 1) {
      if (!formData.email || !formData.phoneNumber || !formData.address) {
        setErrors(prev => ({
          ...prev,
          email: !formData.email ? 'Email is required' : '',
          phoneNumber: !formData.phoneNumber ? 'Phone Number is required' : '',
          address: !formData.address ? 'Address is required' : '',
        }));
        return;
      }

     // Phone number validation
      if (formData.phoneNumber && !phoneNumberRegex.test(formData.phoneNumber)) {
        setErrors(prev => ({
          ...prev,
          phoneNumber: 'Phone number must be 10 digits',
        }));
        return;
      }
    }

    setFormStep(prev => prev + 1);
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.username || !formData.password || !formData.confirmPassword || !formData.email || !formData.phoneNumber || !formData.address) {
      alert('Please fill in all the fields');
      return;
    }

    // Phone number validation before submitting
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      alert('Phone number must be 10 digits');
      return;
    }
    
    const role = selectedRole;

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        role,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = '/'; 
    } else {
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-md md:max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row-reverse h-auto md:h-[75vh]">
        <div className="w-full h-48 md:h-auto relative md:w-1/2">
          <Image
            src="/img/sigiriya1.jpg"
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
              clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        <div className="md:w-1/2 w-full p-4 md:p-10 flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-4 sm:mb-6 -space-x-4 mt-6">
              <a href="/sellerregistration"><button
                onClick={() => setSelectedRole('SELLER')}
                className={`${selectedRole === 'SELLER' ? 'bg-herit text-white' : 'text-herit'} py-2 px-3 sm:px-4 rounded-md bg-cream transition-colors duration-300`}
              >
                SELLER
              </button></a>
              <a href="/userregister"><button
                onClick={() => setSelectedRole('USER')}
                className={`${selectedRole === 'USER' ? 'bg-herit text-white' : 'text-herit'} py-2 px-3 sm:px-4 rounded-md shadow-md bg-cream transition-colors duration-300`}
              >
                USER
              </button></a>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-herit text-center">Heritage Link</h2>
            <p className="text-lg md:text-xl text-center text-red-800 mb-4">User Registration</p>

            <form onSubmit={handleSubmit}>
              {formStep === 0 && (
                <>
                  <div className="mb-3 sm:mb-4">
                    <label className="block font-semibold mb-2 text-herit">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-herit font-semibold border-green-50 bg-cream rounded focus:outline-none"
                    />
                    {errors.username && <p className="text-red-500">{errors.username}</p>}
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <label className="block font-semibold mb-2 text-herit">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-herit font-semibold border-green-50 bg-cream rounded focus:outline-none"
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                  </div>
                  <div className="mb-4 sm:mb-6">
                    <label className="block font-semibold mb-2 text-herit">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-herit font-semibold border-green-50 bg-cream rounded focus:outline-none"
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="py-2 px-4 rounded-md bg-herit text-white hover:bg-opacity-80 transition-colors duration-300 sm:w-auto"
                    >
                      NEXT
                    </button>
                  </div>
                </>
              )}

              {formStep === 1 && (
                <>
                  <div className="mb-3 sm:mb-4">
                    <label className="block font-semibold mb-2 text-herit">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-herit font-semibold border-green-50 bg-cream rounded focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <label className="block font-semibold mb-2 text-herit">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-herit font-semibold border-green-50 bg-cream rounded focus:outline-none"
                    />
                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                  </div>
                  <div className="mb-4 sm:mb-6">
                    <label className="block font-semibold mb-2 text-herit">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-herit font-semibold border-green-50 bg-cream rounded focus:outline-none"
                    />
                    {errors.address && <p className="text-red-500">{errors.address}</p>}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="py-2 px-4 rounded-md bg-herit text-white hover:bg-opacity-80 transition-colors duration-300 sm:w-auto"
                    >
                      REGISTER
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="ml-5 text-left">
              <p className="text-sm text-gray-600">
                If you have an account,{" "}
                <Link href="/"  legacyBehavior>
                  <a className="text-herit font-semibold hover:text-opacity-80 transition-colors duration-300">Login here</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
