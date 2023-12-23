import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const {currentUser } = useSelector((state) => state.user);

    useEffect(()=> {
        const fetchListing = async () => {
            try {
                const res = await fetch (`/api/listing/get/${params.listingId}`)
                const data = await res.json();
                if (data.success === false) {
                    setError(true)
                    return;
                }
                setListing(data)
                setError(false)
            } catch (error) {
                setError(true)
            }
        }
        fetchListing()
    }, [params.listingId])
  return (
    <main>
        {error && <p className='text-3xl my-5 text-center'>Something went wrong!</p>}
        {listing && !error && (
        <div className='p-4'>
            <Swiper navigation>
                {listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div 
                            className='h-[550px] w-[1100px] mx-auto flex justify-center items-center overflow-hidden rounded-3xl mt-2' 
                            style={{background: `url(${url}) center no-repeat` , backgroundSize: 'cover'}}>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className=''>
                <FaShare 
                    className='fixed top-[13%] right-[3%] z-10 border rounded-full w-5 h-5 flex justify-center items-center cursor-pointer'  
                    onClick={()=> {
                        navigator.clipboard.writeText(window.location.href)
                        setCopied(true)
                        setTimeout(()=> {
                            setCopied(false)
                        }, 2000)
                    }}
                />
            </div>
            {copied && (
                <p className='fixed top-[15%] right-[0%] z-1 rounded-md p-2 text-xs'>
                Link copied!
              </p>
            )}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-blue-600' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800 my-2'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='flex flex-wrap item-center gap-4 my-1 whitespace-nowrap font-semibold text-sm sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaBed className='text-lg'/>
                    {listing.bedrooms>1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef == currentUser._id && !contact && (
                <button
                    onClick={()=> setContact(true)} 
                    className='bg-slate-700 text-white rounded-lg 
                    uppercase hover:opacity-80 p-3 my-1'
                    >
                        Contact
                </button>
            )}
            {contact && <Contact listing={listing}/> }
            
            </div>
            </div>
        )}
    </main>
  )
}
