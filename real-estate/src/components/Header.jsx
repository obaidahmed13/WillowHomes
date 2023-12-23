import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import {UserIcon} from '@heroicons/react/24/outline'


export default function Header() {
  const {currentUser} = useSelector(state=>state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('searchTerm')
    if (searchTermFromURL) {
        setSearchTerm(searchTermFromURL)

    }
    // useEffect is triggered when search term is changed
  }, [])


  return (
    <header className="shadow-sm">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap mx-8">
                    <span className="text-blue-700">Willow</span>
                    <span>Homes</span>
                </h1>
            </Link>
            
            <form onClick={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center ml-12">
                <input type="text" placeholder="Search..."  
                className="bg-transparent focus:outline-none w-24 sm:w-64 h-3"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <button className='hover:scale-110 transition-scale duration-300'>
                    <FaSearch/>
                </button>
            </form>
            <ul className='flex gap-4 mx-8 '>
                <Link to='/'>
                    <ul className='hidden sm:inline text-slate-700 hover:text-blue-600'>Home</ul>
                </Link>
                <Link to='/about'>
                    <ul href="/home" className='hidden sm:inline text-slate-700 hover:text-blue-600'>About</ul>
                </Link>
                <Link to='/user-listing'>
                    {currentUser? (
                        <ul>Listings</ul>
                    ):(null)}
                </Link>
                <Link to='/profile'>
                {currentUser ? (
                    <UserIcon className=' h-6 w-6 item-center hover:scale-110 transition-scale duration-300'/>
                    ) : (
                    <ul href="/home" className=' hidden sm:inline text-slate-700 hover:text-blue-600'>Sign in</ul>
                )}
                </Link>
                
            </ul>
        </div>
    </header>
  )
}
