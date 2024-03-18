import React from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { Textarea } from "@material-tailwind/react";

//for address
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export function Steps() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


  //for Address
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    country: '',
    city: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [coordinates, setCoordinates] = useState([25, 78]);
  const [mapKey, setMapKey] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(3);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
          params: {
            key: 'bedcd1f180544332a2d025b5be6eedb5',
            q: `${formData.address}, ${formData.city}, ${formData.country}`,
          },
        });

        const { lat, lng } = response.data.results[0].geometry;
        setCoordinates([lat, lng]);
        setMapKey((prevKey) => prevKey + 1);

        if (formData.address) {
          setZoomLevel(15); // for specific addresses
        } else if (formData.city) {
          setZoomLevel(10); // for citys
        } else if (formData.country) {
          setZoomLevel(5); // for countries
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.country, formData.city, formData.address]);


  //complete listing 
  const { currentUser } = useSelector((city) => city.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  return (
    <div className="w-full px-24">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              Step 1
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Add Address
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              Step 2
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Add Property Details
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              Step 3
            </Typography>
            <Typography
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Add Images
            </Typography>
          </div>
        </Step>
      </Stepper>

      {/*step 1 Adress*/}
      {activeStep === 0 &&
        <div className="container mx-auto mt-[60px] p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label htmlFor="country" className="text-md font-medium">
                Country
              </label>
              <input
                type="text"
                id="country"
                required
                onChange={handleChange}
                value={formData.country}
                className="w-full p-1 mt-1 border rounded"
              />
            </div>

            <div>
              <label htmlFor="city" className="text-md font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                required
                onChange={handleChange}
                value={formData.city}
                className="w-full p-1 mt-1 border rounded"
              />
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="address" className="text-md font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
              className="w-full p-1 mt-1 border rounded"
            />
          </div>

          <div className="mt-5">
            <MapContainer key={mapKey} center={coordinates} zoom={zoomLevel} style={{ height: '300px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={coordinates}>
                <Popup>{`${formData.address}, ${formData.city}, ${formData.country}`}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      }

      {/*Step 2 Property details*/}
      {activeStep === 1 &&
        <main className='p-3 mt-24 max-w-4xl mx-auto'>
          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
              <input
                type='text'
                placeholder='Name'
                className='border p-3 rounded-lg'
                id='name'
                maxLength='62'
                minLength='10'
                required
                onChange={handleChange}
                value={formData.name}
              />
              <Textarea
                size="lg"
                label="Description"
                type='text'
                placeholder=''
                className='border p-3 rounded-lg'
                id='description'
                required
                onChange={handleChange}
                value={formData.description}
              />

              <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='sale'
                    className='w-5'
                    onChange={handleChange}
                    checked={formData.type === 'sale'}
                  />
                  <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='rent'
                    className='w-5'
                    onChange={handleChange}
                    checked={formData.type === 'rent'}
                  />
                  <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='parking'
                    className='w-5'
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                  <span>Parking spot</span>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='furnished'
                    className='w-5'
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                  <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='offer'
                    className='w-5'
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  <span>Offer</span>
                </div>
              </div>
              <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    id='bedrooms'
                    min='1'
                    max='10'
                    required
                    className='p-3 border border-gray-300 rounded-lg'
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                  <p>Beds</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    id='bathrooms'
                    min='1'
                    max='10'
                    required
                    className='p-3 border border-gray-300 rounded-lg'
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                  <p>Baths</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    id='regularPrice'
                    min='50'
                    max='10000000'
                    required
                    className='p-3 border border-gray-300 rounded-lg'
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  <div className='flex flex-col items-center'>
                    <p>Regular price</p>
                    {formData.type === 'rent' && (
                      <span className='text-xs'>($ / month)</span>
                    )}
                  </div>
                </div>
                {formData.offer && (
                  <div className='flex items-center gap-2'>
                    <input
                      type='number'
                      id='discountPrice'
                      min='0'
                      max='10000000'
                      required
                      className='p-3 border border-gray-300 rounded-lg'
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                    <div className='flex flex-col items-center'>
                      <p>Discounted price</p>

                      {formData.type === 'rent' && (
                        <span className='text-xs'>($ / month)</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </main>
      }

      {/* step  3 Upload images*/}
      {activeStep === 2 &&
        <main className='mt-24 p-3 max-w-4xl mx-auto'>

          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>

            <div className='flex flex-col flex-1 gap-4'>
              <p className='font-semibold'>
                Images:
                <span className='font-normal text-gray-600 ml-2'>
                  The first image will be the cover (max 6)
                </span>
              </p>
              <div className='flex gap-4'>
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className='p-3 border border-gray-300 rounded w-full'
                  type='file'
                  id='images'
                  accept='image/*'
                  multiple
                />
                <button
                  type='button'
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                >
                  {uploading ? <div className=' items-center flex justify-center'>< svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-live="polite" aria-busy="true" aria-labelledby="title-08a desc-08a" className="w-6 h-6">
                  <path d="M7 8H3V16H7V8Z" className="fill-[#10b981] animate animate-bounce " />
                  <path d="M14 8H10V16H14V8Z" className="fill-[#10b981] animate animate-bounce  [animation-delay:.2s]" />
                  <path d="M21 8H17V16H21V8Z" className="fill-[#10b981] animate animate-bounce  [animation-delay:.4s]" />
                </svg></div> : 'Upload'}
              </button>

            </div>
            <p className='text-red-700 text-sm'>
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className='flex justify-between p-3 border items-center'
                >
                  <img
                    src={url}
                    alt='listing image'
                    className='w-20 h-20 object-contain rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className='p-3 bg-black text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? <div className=' items-center flex justify-center'>< svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-live="polite" aria-busy="true" aria-labelledby="title-08a desc-08a" className="w-6 h-6">
                  <path d="M7 8H3V16H7V8Z" className="fill-[#10b981] animate animate-bounce " />
                  <path d="M14 8H10V16H14V8Z" className="fill-[#10b981] animate animate-bounce  [animation-delay:.2s]" />
                  <path d="M21 8H17V16H21V8Z" className="fill-[#10b981] animate animate-bounce  [animation-delay:.4s]" />
                </svg></div> : 'Create listing'}
            </button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
          </div>
        </form>
        </main>
      }
<div className="mt-2 flex justify-between">
  <Button onClick={handlePrev} disabled={isFirstStep}>
    Prev
  </Button>
  <Button onClick={handleNext} disabled={isLastStep}>
    Next
  </Button>
</div>
    </div >
  );
}
