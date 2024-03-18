import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';

export default function ListingItem({ listing }) {
  const handleClick = () => {
    window.scroll(0,0)
  }
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`} onClick={handleClick}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <LocationOnIcon className='h-4 w-4 text-[#059669]' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            ₹ {" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>

            <div className='font-bold text-md  '>
              <span className='mr-2 text-center items-center text-[#059669]'><BedIcon /></span>

              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed`}
            </div>
            <div className='font-bold text-md '>
              <span className='mr-2 text-center items-center text-[#059669]'><BathtubIcon /></span>

              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
            {/* <div className='font-bold text-md '>
              <span className='mr-2 text-center items-center text-[#059669]'><LocalParkingIcon /></span>
              {listing.parking ? 'Parking spot' : 'No Parking'}
            </div> */}
            {/* <div className='font-bold text-md '>
              <FaChair className='mr-2 text-center items-center text-[#059669]' />
              {listing.furnished ? 'Furnished' : 'Unfurnished'}
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
