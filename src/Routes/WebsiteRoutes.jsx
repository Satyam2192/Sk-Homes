import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import About from '../pages/About';
import Profile from '../pages/Profile';
import PrivateRoute from '../components/PrivateRoute';
import CreateListing from '../pages/CreateListing';
import UpdateListing from '../pages/UpdateListing';
import Listing from '../pages/Listing';
import Search from '../pages/Search';
import { NavbarWithMegaMenu } from '../components/Navbar';
import { Steps } from '../components/Popup/Steps';
import Footer from '../components/Footer';
import EditFooter from '../pages/Admin/FooterEdit';
export default function WebsiteRoutes() {
  return (
    <>
      <NavbarWithMegaMenu />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/search' element={<Search />} />
          <Route path='/listing/:listingId' element={<Listing />} />

          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route
              path='/update-listing/:listingId'
              element={<UpdateListing />}
            />
            <Route path='/popup' element={<Steps />} />
          </Route>

          {/* Admin Routes */}
          <Route>
            <Route path='/editFooter' element={<EditFooter />} />
          </Route>
        </Routes>

      
      <Footer />

    </>
  );
}
