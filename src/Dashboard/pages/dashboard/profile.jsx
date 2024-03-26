import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { MessageCard } from "../../widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "../../data";


// import a from "../../../public/img/background-image.png"


//for profile
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL, getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, } from '../../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {
  Dialog,
} from "@material-tailwind/react";
import { PopUp } from '../../../pages/PopUp';
import Loader2 from "../../../components/Loader2"
import { FaEdit } from "react-icons/fa";
import successAleart from "../../../components/common/SuccessAleart";

export function Profile() {
  //profile
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };


  return (
    <>
      <successAleart message="hello" />
      {/* Upload Feedback */}
      <p className="text-sm text-center">
        {fileUploadError ? (
          <span className="text-red-700">Error: Image must be less than 2mb</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-700">Image successfully uploaded!</span>
        ) : (
          ''
        )}
      </p>

      <div className="relative mt-8 h-28 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <label htmlFor="avatar">
                  <Avatar
                    src={formData.avatar || currentUser.avatar}
                    alt="profile"
                    size="xl"
                    variant="rounded"
                    className="relative rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <span className="edit-icon absolute top-2 left-[80px] inline-block">
                    <FaEdit className="w-6 h-6" />
                  </span>

                  <input type="file" id="avatar" ref={fileRef} hidden accept="image/*" onChange={(e) => setFile(e.target.files[0])} ></input>
                </label>


                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {currentUser.username}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {currentUser.email}
                  </Typography>
                </div>
              </div>

            </div>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-1 xl:grid-cols-1">


              <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-6 rounded-lg bg-gray-100 shadow-md'>
                {/* Form Fields */}
                <Typography variant="h6" color="blue-gray" className="">
                  Edit Details
                </Typography>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    id="username"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full mt-2">
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    defaultValue={currentUser.email}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full mt-2">
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange}
                  />
                </div>

                {/* Buttons */}
                <Button className='w-full h-12'>
                  <button
                    disabled={loading}
                    className='text-white uppercase disabled:opacity-80'
                  >
                    {loading ? <div className=''><Loader2 /></div> : 'Update'}
                  </button>
                </Button>

              </form>

            </div>


          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
