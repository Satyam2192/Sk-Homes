import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Loader from '../components/Loader';


export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };




  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>

          <div className='flex flex-col gap-2 flex-wrap'>
            <label className=' text-xl font-medium text-[#334155]'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='inline-flex items-center justify-center w-5 cursor-pointer rounded border-2 border-[#64748b] bg-white transition-colors checked:border-sky checked:bg-[#059669] checked:hover:border-[#059669] checked:hover:bg-[#059669] focus:outline-none checked:focus:border-[#047857] checked:focus:bg-[#047857] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span className='inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-[#059669] hover:bg-[#059669]'>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='inline-flex items-center justify-center w-5 cursor-pointer rounded border-2 border-[#64748b] bg-white transition-colors checked:border-sky checked:bg-[#059669] checked:hover:border-[#059669] checked:hover:bg-[#059669] focus:outline-none checked:focus:border-[#047857] checked:focus:bg-[#047857] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50'
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <span className='inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-[#059669] hover:bg-[#059669]'>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='inline-flex items-center justify-center w-5 cursor-pointer rounded border-2 border-[#64748b] bg-white transition-colors checked:border-sky checked:bg-[#059669] checked:hover:border-[#059669] checked:hover:bg-[#059669] focus:outline-none checked:focus:border-[#047857] checked:focus:bg-[#047857] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50'
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <span className='inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-[#059669] hover:bg-[#059669]'>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='inline-flex items-center justify-center w-5 cursor-pointer rounded border-2 border-[#64748b] bg-white transition-colors checked:border-sky checked:bg-[#059669] checked:hover:border-[#059669] checked:hover:bg-[#059669] focus:outline-none checked:focus:border-[#047857] checked:focus:bg-[#047857] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span className='inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-[#059669] hover:bg-[#059669]'>Offer</span>
            </div>
          </div>



          {/* <div className="md:col-span-3">
            <label className="font-medium block  mb-2">Amenities:</label>
            <div className="flex items-center flex-wrap">
              {["Parking", "Furnished"].map((amenities, index) => (
                <div key={index} className="mr-3 mb-2">
                  <input
                    className="hidden peer focus:ring-blue-500 h-4 w-4 border border-gray-300 rounded-sm checked:bg-[#059669] checked:border-transparent"
                    type="checkbox"
                    id={amenities}
                    value={amenities}
                    checked={sidebardata.amenities} 
                    onChange={handleChange}
                  />
                  <label htmlFor={amenities}
                    className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide peer-checked:bg-[#059669] peer-checked:text-white  peer-focus:ring peer-focus:ring-blue-200 transition duration-300 rounded whitespace-nowrap bg-[#bbe6d8] hover:bg-[#059669] ">
                    {amenities}
                  </label>
                </div>
              ))}
            </div>
          </div> */}




          <div className='flex flex-col gap-2 flex-wrap'>
            <label className=' text-xl font-medium text-[#334155]'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='inline-flex items-center justify-center w-5 cursor-pointer rounded border-2 border-[#64748b] bg-white transition-colors checked:border-sky checked:bg-[#059669] checked:hover:border-[#059669] checked:hover:bg-[#059669] focus:outline-none checked:focus:border-[#047857] checked:focus:bg-[#047857] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span className='inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-[#059669] hover:bg-[#059669]'>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='inline-flex items-center justify-center w-5 cursor-pointer rounded border-2 border-[#64748b] bg-white transition-colors checked:border-sky checked:bg-[#059669] checked:hover:border-[#059669] checked:hover:bg-[#059669] focus:outline-none checked:focus:border-[#047857] checked:focus:bg-[#047857] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span className='inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-[#059669] hover:bg-[#059669]'>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className=' text-xl font-medium text-[#334155]'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='
              appearance-none
              bg-white
              rounded
              border
              shadow-md
              py-2
              px-3
              cursor-pointer
              focus:outline-none
              focus:ring-2
              focus:ring-inset focus:ring-sky text-[#334155]'
            >
              <option value='regularPrice_asc' >Price: low to high</option>
              <option value='regularPrice_desc' >Price: high to low</option>
              <option value='createdAt_desc' >Latest</option>
              <option value='createdAt_asc' >Oldest</option>
            </select>
          </div>
          <button className='bg-[#059669] hover:bg-[#059669] text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        {sidebardata.searchTerm && (
          <h1 className="text-3xl font-medium border-b p-3 text-[#334155] mt-5">
            Search Results for <span className="text-[#059669]">{sidebardata.searchTerm}</span>
          </h1>
        )}

        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <div
              className="flex w-full items-start gap-4 rounded border border-pink-100 bg-pink-50 px-4 py-3 text-sm text-pink-500"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                role="graphics-symbol"
                aria-labelledby="title-04 desc-04"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Nothing Found</p>
            </div>
          )}
          {loading && (
            <p className='text-xl text-[#047857] text-center w-full'>
              <Loader />
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='inline-flex items-center justify-center w-5 cursor-pointer rounded border-2 border-[#64748b]  transition-colors bg-[#059669] '
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
