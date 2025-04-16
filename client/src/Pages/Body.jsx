import React from 'react'
import trainImage from '../assets/train.jpeg';

const Body = () => {
    return (
        <div
          className="relative w-full h-screen bg-cover bg-center "
          style={{ backgroundImage: `url(${trainImage})`  }}
        >
          {/* Overlay for slight dark background */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    
          {/* Form Card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-white bg-opacity-95 rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-6 space-x-4">
              <button className="bg-blue-900 text-white font-semibold px-6 py-2 rounded">PNR STATUS</button>
              <button className="bg-blue-900 text-white font-semibold px-6 py-2 rounded">CHARTS / VACANCY</button>
            </div>
    
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">BOOK TICKET</h1>
    
            <form className="space-y-4">
              <input type="text" placeholder="From" className="w-full p-3 border rounded" />
              <input type="text" placeholder="To" className="w-full p-3 border rounded" />
    
              <div className="grid grid-cols-2 gap-4">
                <input type="date" defaultValue="2025-04-14" className="w-full p-3 border rounded" />
                <select className="w-full p-3 border rounded">
                  <option>All Classes</option>
                  <option>Sleeper</option>
                  <option>AC</option>
                </select>
              </div>
    
              <select className="w-full p-3 border rounded">
                <option>GENERAL</option>
                <option>LADIES</option>
                <option>TATKAL</option>
              </select>
    
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <label><input type="checkbox" className="mr-1" /> Person With Disability Concession</label>
                <label><input type="checkbox" className="mr-1" /> Flexible With Date</label>
                <label><input type="checkbox" className="mr-1" /> Railway Pass Concession</label>
                <label><input type="checkbox" className="mr-1" /> Train with Available Berth</label>
              </div>
    
              <button className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600">Search</button>
            </form>
    
            <button className="w-full mt-4 bg-yellow-400 text-black p-3 font-semibold rounded">Easy Booking on AskDISHA</button>
    
            <div className="mt-6 text-sm text-center text-blue-700">
              <p>
                <span className="text-black font-semibold">Customers can use enhanced interface for their IRCTC related queries!!</span>
                <br />
                <a href="https://equery.irctc.co.in" className="text-blue-800 underline">https://equery.irctc.co.in</a>
              </p>
              <p className="text-red-600 font-bold mt-2">Customer Care Numbers: 14646 / 08044647999 / 08035734999</p>
              <p className="mt-2 text-blue-900">
                BEWARE OF FRAUDSTERS: Always download official IRCTC Rail Connect App from the Google Play Store or Apple App Store only.
              </p>
            </div>
          </div>
        </div>
      );
}

export default Body;