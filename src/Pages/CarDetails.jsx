import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../Components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const CarDetails = () => {
  const {id} = useParams()

  const {cars,axios,pickupDate,setPickupDate,returnDate,setRetrunDate} = useAppContext() 

  const navigate = useNavigate()
  const [car,setCar] = useState(null)

   const currency = (import.meta?.env?.VITE_CURRENCY)  || "₹";

   const handleSubmit = async(e) =>{
    e.preventDefault ()
    try {
    const {data}  =  await axios.post('/api/booking/create',{car:id,pickupDate,returnDate})
    if(data.success){
      toast.success(data.message)
      navigate('/my-bookings')
    }else{
      toast.error(data.message)
    }
    }
     catch (error) {
      toast.error(error.message)
    }
   }

  useEffect(()=>{
   setCar (car.find(car => car._id === id))
   
  },[cars,id])

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={()=> navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="arrow" className='rotate-180 opacity-65' />
        Back to all cars</button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          {/* left car image &details */}
          <div className='lg:col-span-2'>
            <img src={car.image} alt="" className='w-full h-auto md:max-h-1000
            object-cover rounded-xl mb-6 shadow-5xl ' />
            <div className='space-y-6'>
              <div>
                <h1 className='text-3xl  text-yellow-700 font-bold'> {car.brand} {car.model}</h1>
                <p className="text-gray  text-lg">{car.category}.{car.year}</p>
              </div>
              <hr className='border-borderColor my-6'/>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {[
                  {icon:assets.users_icon,text: `${car.seating_capacity}Seats`},

                  {icon:assets.fuel_icon,text: car.fuel_type},
                  {icon:assets.car_icon,text: car.transmission},
                  {icon:assets.fuel_icon,text: car.location},
                ].map(({icon,text})=>(
                  <div key={text} className='flex flex-col items-center text-indigo-500 bg-light p-4 rounded-lg'>
                    <img src={icon} alt=""  className='h-5 mb-2'/>
                    {text}
                    </div>
                ))}
              </div>
              {/*description */}
              <div>
                <h1 className='text-xl text-green-900 font-medium mb-3'>Description</h1>
                <p className='text-green-700'>{car.description} </p>
                 
               
              </div>
              {/* featuer */}
              <div>
                   <h1 className='text-xl font-medium mb-3'>Features</h1>
                       <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            {
                               ["360 Camera","Bluetooth","GPS","Heated Seats","Rear View","Mirror"]
                                  .map((item)=>(
                          <li key={item} className='flex items-center text-gray-500' >
                              <img src={assets.check_icon}  className="h-4 mr-2"  alt="check icon" />  
                                  {item}
                           </li>      
                          ))           
                         }
                   </ul>
               </div>
            </div>
          </div>    
          
            {/* right booking form */}
            <form  onSubmit={handleSubmit}className='shadow-lg  h-max sticky top-18 rounded-xl p-6 space-y-6
            text-'>
            <p className='flex items-center justify-between text-2x1 text-yellow-500 font-bold'>{currency}{car.pricePerDay}
              <span className='text=base text-green-700 font-semibold'>per day</span> </p>
              
             <hr className='border-borderColor-my-9'/>

             <div className=' flex flex-col gap-2'>
              <label htmlFor='pickup-date'> Pickup Date </label>
              <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
              type="date" className='border border-border-color px-3 py-3 
              rounded-lg ' required id='pickup-date' min={new Date().toISOString().split("T")[0]} />
             </div>
             <div className=' flex flex-col gap-2'>
              <label htmlFor='return-date'> Return Date </label>
              <input value={returnDate} onChange={(e)=>setRetrunDate(e.target.value)}
              type="date" className='border border-border-color px-3 py-3 
              rounded-lg ' required id='return-date'  />
             </div>

             <button 
             className='w-full bg-green-700 hover:bg-primary-dul transition-all 
               py-3 font-medium text-white rounded-xl cursor-pointer'>
                Book Now</button>
                <p className='text-center text-sm'>No credit car required to reserve</p>
             
            </form>
           
          
        </div>
    </div>
  ):<Loader/>
}

export default CarDetails; 
                        
                
                     
          
