import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import {  Dialog } from "@material-tailwind/react";
import { PopUp } from "../../../pages/PopUp";


export function Home() {
  const { currentUser } = useSelector((state) => state.user);


  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);


  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  const ShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    ShowListings();
  }, [])


  return (
    <>

      <div className="mt-12">
        <div className="px-4 pb-4">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Properties
          </Typography>
          <Typography
            variant="small"
            className="font-normal text-blue-gray-500"
          >
            Your Listead Properties
          </Typography>

          <p className='text-red-700 mt-5'>
            {showListingsError ? 'Error showing listings' : ''}
          </p>

          {userListings && userListings.length > 0 && (


            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {userListings.map((listing, index) => (
                <div key={listing._id}>

                  <Card key={listing.name} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={listing.imageUrls[0]}
                        alt={listing.name}
                        className="relative h-full w-full object-cover"
                      />

                      {/* delete */}
                      <span className="absolute top-1 left-1">
                        <button
                          onClick={() => handleListingDelete(listing._id)}
                          className='text-red-700 uppercase'
                        >
                          <MdDeleteForever className="w-9 h-9" />
                        </button>
                      </span>

                      {/* edit */}
                      <span className="absolute top-1 right-1">
                        <Link to={`/update-listing/${listing._id}`}>
                          <FaEdit className="w-9 h-9 text-blue-500" />
                        </Link>
                      </span>
                    </CardHeader>

                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {`#${index + 1}`}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {listing.name}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {listing.description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={`/listing/${listing._id}`}>
                        <Button variant="outlined" size="sm">
                          view project
                        </Button>
                      </Link>



                    </CardFooter>
                  </Card>

                </div>
              )
              )}
            </div>
            


          )}
        </div>
        {/* to add property or listing */}
        <Button className='w-full p-4' onClick={() => handleOpen("xxl")} >
                  Add Property
                </Button>
                <Dialog
                  open={size === "xxl"}
                  size={size || "md"}
                  handler={handleOpen}
                >
                  <div className="flex justify-end mr-10">
                    <Button
                      variant="text"
                      color="red"
                      onClick={() => handleOpen(null)}
                      className="mt-1"
                    >
                      <svg className="w-9" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill="#1C274C"></path>
                          <path d="M8.96967 8.96967C9.26256 8.67678 9.73744 8.67678 10.0303 8.96967L12 10.9394L13.9697 8.96969C14.2626 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0303L13.0607 12L15.0303 13.9697C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0304 15.0303C9.73746 15.3232 9.26258 15.3232 8.96969 15.0303C8.6768 14.7374 8.6768 14.2626 8.96969 13.9697L10.9394 12L8.96967 10.0303C8.67678 9.73744 8.67678 9.26256 8.96967 8.96967Z" fill="#1C274C"></path>
                        </g>
                      </svg>
                    </Button>
                  </div>
                  <PopUp />
                </Dialog>
                {/* ------- */}

      </div>
    </>
  );
}

export default Home;
