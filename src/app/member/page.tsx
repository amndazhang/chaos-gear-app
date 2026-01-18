'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'

export default function MemberPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    destination: '',
    id: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Checkout created:', data);
        setCheckoutId(data.checkout_id);
        setIsLoading(false);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('Failed to submit form. Please try again.');
        setIsLoading(false);
      });
  };

  const handleNewSubmission = () => {
    setFormData({ name: '', email: '', phoneNumber: '', destination: '', id: '' });
    setCheckoutId(null);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        {isSubmitted ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Confirmation</h1>
            <div className="space-y-4 text-left mb-6">
              <div className="border-b pb-2">
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-800">{formData.name}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{formData.email}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-semibold text-gray-800">{formData.phoneNumber}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm text-gray-600">Destination</p>
                <p className="font-semibold text-gray-800">{formData.destination}</p>
              </div>
              <div className="pb-2">
                <p className="text-sm text-gray-600">Cal ID or Driver's License</p>
                <p className="font-semibold text-gray-800">{formData.id}</p>
              </div>
            </div>
            {checkoutId && (
              <div className="flex flex-col items-center mb-6">
                <QRCodeCanvas value={checkoutId} size={256} />
                <p className="mt-4 text-sm font-semibold text-gray-700">Checkout ID: {checkoutId}</p>
              </div>
            )}
            <button
              onClick={handleNewSubmission}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Member Form</h1>
            
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your destination"
            />
          </div>

          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
              Cal ID or Driver's License
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Cal ID or Driver's License number"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
          </>
        )}
      </div>
    </div>
  );
}
