import React, { useEffect, useState } from 'react';
import Tittlen from '../../Components/Owner/Tittlen';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';




const ManageBooking = () => {
  const {currency,axios} = useAppContext()
  const [booking, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
   try {
    const {data}  = await axios.get('/api/bookings/owner')
    data.success? setBookings(data.bookings):toast.error(data.message)
    
   } catch (error) {
    toast.error(error.message)
   }
  };

  const changeBokingStatus = async (bookingId,status) => {
   try {
    const {data}  = await axios.post('/api/bookings/change-status',
      {bookingId,status })
    if(data.success){
      toast.success(data.message)
      fetchOwnerBookings()
    }else{
      toast.error(data.message)
    }

   } catch (error) {
    toast.error(error.message)
   }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Tittlen
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"
      />

      <div className="max-w-6xl w-full rounded-xl overflow-hidden border border-borderColor mt-6 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-gray-700">
          <thead className="bg-gray-50 border-b border-borderColor text-gray-500">
            <tr>
              <th className="p-4 font-semibold">Car</th>
              <th className="p-4 font-semibold max-md:hidden">Date Range</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold max-md:hidden">Payment</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((booking, index) => (
              <tr key={index} className="border-t border-borderColor hover:bg-gray-50 transition">
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="h-16 w-16 rounded-lg object-cover shadow"
                  />
                  <div className="font-medium text-gray-800 max-md:hidden">
                    {booking.car.brand} {booking.car.model}
                  </div>
                </td>
                <td className="p-4 max-md:hidden">
                  {booking.pickupDate.split('T')[0]} - {booking.returnDate.split('T')[0]}
                </td>
                <td className="p-4">{currency} {booking.price}</td>
                <td className="p-4 max-md:hidden">
                  <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>
                    Offline
                  </span>
                </td>
                <td className="p-4">
                  {booking.status === 'pending' ? (
                    <select onChange={(e)=>changeBokingStatus(booking._Id,e.target.value)}
                      value={booking.status}
                      className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-one'
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
