import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import backgroundImage from "../images/homebg4.jpg";
import backgroundImage1 from "../images/backgstairs.jpg";
import backgroundImage2 from "../images/homebg5.webp";
import {motion} from 'framer-motion'

export const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="mb-16">
      <div className="flex flex-col border border-gray-100 lg:flex-row  bg-white overflow-hidden">
        <div className="flex flex-col gap-6 p-28 px-1 max-w-6xl mx-8 w-full lg:w-1/2 ">
          <motion.h1
          className="text-slate-700 font-bold text-5xl "
          initial={{y: "4rem", opacity: 0}}
          animate={{y:0, opacity: 1}}
          tranistion = {{
            duration: 5,
            type: "spring"
          }}>
          Find Your Dream 
          <span className="text-blue-600"> Home</span>
          <br />
          With Ease.</motion.h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            Willow estate is the best way to find your home with ease.
            <br />
            We have a wide range of properties for you to choose from.
          </div>
          <Link
            to={"/search"}
            className=" text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          >
            Lets get started...
          </Link>
        </div>
        <div
          className="w-full lg:w-1/2 flex flex-col sm:flex-col justify-center bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>
      </div>
      <div className="bg-gray-100 p-10 py-12 flex flex-col gap-5 w-full lg:flex-row overflow-hidden">
        <div className="flex bg-white lg:w-1/2 mx-4 shadow-lg h-72 hover:scale-105 transition-scale duration-300">
          <div className="w-1/2 p-7 mt-3 overflow-hidden ">
            <h1>
              Find Your New <span>Home</span>
            </h1>
            <div className="text-gray-400 text-xs sm:text-sm my-4 ">
                Explore listings with high-quality visuals and transparent
              communication, making your journey to finding the perfect home
              enjoyable and stress-free
            </div>
            <Link
              to={"/search"}
              className=" text-xs sm:text-sm text-blue-800 font-bold hover:underline"
            >
              See your options...
            </Link>
          </div>
          <div
            className="w-full lg:w-1/2 flex flex-col  bg-no-repeat bg-cover bg-center "
            style={{
              backgroundImage: `url(${backgroundImage2})`,
            }}
          ></div>
        </div>

        <div className="flex bg-white lg:w-1/2 mx-4 shadow-lg h-72 hover:scale-105 transition-scale duration-300">
          <div className=" w-1/2 p-7 mt-3 overflow-hidden">
            <h1>
              Sell / Rent Your <span className="text-black">Home</span>
            </h1>
            <div className="text-gray-400 text-xs sm:text-sm my-4 ">
              Willow State simplifies the process of selling or renting homes
              with its user-friendly platform, offering real-time market
              insights and advanced search features
            </div>
            <Link
              to={"/create-listing"}
              className=" text-xs sm:text-sm text-blue-800 font-bold hover:underline "
            >
              Create a listing...
            </Link>
          </div>
          <div
            className="w-full lg:w-1/2 flex flex-col justify-center bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage1})`,
            }}
          ></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-5">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
};
