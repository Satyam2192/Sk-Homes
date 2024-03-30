import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaChair,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';

import Contact from '../components/Contact';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Button } from '@material-tailwind/react';
import Loader from '../components/Loader';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SliderCard from './Home/SlidersCard';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [coordinates, setCoordinates] = useState([25, 78]);
  const [mapKey, setMapKey] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(3);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'><Loader /></p>}
      {error && (
        <div className="flex items-start w-full gap-4 px-4 py-3 text-sm text-pink-500 border border-pink-100 rounded bg-pink-50" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" role="graphics-symbol" aria-labelledby="title-04 desc-04">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Something went wrong!</p>
        </div>
      )}
      {listing && !loading && !error && (
        <div className='mt-2'>
          <SliderCard images={listing.imageUrls} />

          <div className='fixed top-[13%] right-[3%] z-10 border-[#039667] rounded-full w-12 h-12 flex justify-center items-center bg-[#87f8d4] cursor-pointer'>
          <ShareOutlinedIcon className='border-[#039667] text-[#059669]' onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }} />
          </div>
          {copied && (
            
            <div className="w-[99%] mx-2 bottom-[1%]  z-10 flex items-center gap-4 px-4 py-3 text-lg border rounded border-[#039667] bg-[#87f8d4] text-[#059669]" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" role="graphics-symbol" aria-labelledby="title-01 desc-01">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Link copied!</p>
            </div>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 mt-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ₹{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-[#059669]' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className=' w-full max-w-[200px] text-white text-lg font-semibold p-1 inline-flex items-center justify-center  cursor-pointer rounded border-2  transition-colors border-sky bg-[#059669] hover:border-[#059669] hover:bg-[#059669] focus:outline-none focus:border-[#047857] focus:bg-[#047857]'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className=' w-full max-w-[200px] text-white text-lg font-semibold p-1 inline-flex items-center justify-center  cursor-pointer rounded border-2  transition-colors border-sky bg-[#059669] hover:border-[#059669] hover:bg-[#059669] focus:outline-none focus:border-[#047857] focus:bg-[#047857]'>
                  Rs. {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>

            <div className="flex items-start w-full gap-4 px-4 py-3 text-sm border rounded border-cyan-100 bg-cyan-50 text-cyan-500" role="alert">
              <MapsHomeWorkOutlinedIcon />
              <p>{listing.description}</p>
            </div>

            <ul className='text-[#059669] font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <span className='mr-2 text-center items-center text-[#059669]'><BedIcon /></span>

                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <span className='mr-2 text-center items-center text-[#059669]'><BathtubIcon /></span>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center g whitespace-nowrap '>
                <span className='mr-2 text-center items-center text-[#059669]'><LocalParkingIcon /></span>
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <Button
                onClick={() => setContact(true)}
                className='bg-black text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </Button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
          <div className="mt-3">
            <MapContainer key={mapKey} center={coordinates} zoom={10} style={{ height: '340px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={coordinates}>
                <Popup>{`${listing.address}, ${listing.state}, ${listing.country}`}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )
      }
    </main >
  );
}
