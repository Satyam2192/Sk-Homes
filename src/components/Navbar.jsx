import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Bars4Icon,
    GlobeAmericasIcon,
    NewspaperIcon,
    PhoneIcon,
    RectangleGroupIcon,
    SquaresPlusIcon,
    SunIcon,
    TagIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import HouseIcon from '@mui/icons-material/House';

const navListMenuItems = [
    {
        title: "House at Delhi",
        description: "Independent Houses for Sale in Delhi",
        icon: HouseIcon,
        url: "/search?searchTerm=Delhi",

    },

    {
        title: "House at Bangalore",
        description: "Independent Houses for Sale in Bangalore",
        icon: HouseIcon,
        url: "/search?searchTerm=Bangalore",
    },

    {
        title: "House at Hyderabad",
        description: "Independent Houses for Sale in Hyderabad",
        icon: HouseIcon,
        url: "/search?searchTerm=Hyderabad",

    },
    {
        title: "House at Mumbai",
        description: "Independent Houses for Sale in Mumbai",
        icon: HouseIcon,
        url: "/search?searchTerm=Mumbai",

    },
    {
        title: "House at Pune",
        description: "Independent Houses for Sale in Pune",
        icon: HouseIcon,
        url: "/search?searchTerm=Pune",

    },
    {
        title: "House at Gurgaon",
        description: "Independent Houses for Sale in Gurgaon",
        icon: HouseIcon,
        url: "/search?searchTerm=Gurgaon",

    },
    {
        title: "House at Noida",
        description: "Independent Houses for Sale in Noida",
        icon: HouseIcon,
        url: "/search?searchTerm=Noida",

    },
    {
        title: "Special Offers",
        description: "Explore limited-time deals and bundles",
        icon: TagIcon,
        url: "/search?searchTerm=&type=all&parking=false&furnished=false&offer=true&sort=regularPrice&order=asc",

    },
    {
        title: "About Us",
        description: "Meet and learn about our dedication",
        icon: UserGroupIcon,
        url: "/about",

    },


];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const renderItems = navListMenuItems.map(
        ({ icon, title, description, url }, key) => (
            <Link to={url} key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg">
                    <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                        {" "}
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 text-gray-900 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm font-bold"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xs !font-medium text-blue-gray-500"
                        >
                            {description}
                        </Typography>
                    </div>
                </MenuItem>
            </Link>
        ),
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-medium">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Resources
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}


import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Input } from "@material-tailwind/react";
import { FaSearch } from 'react-icons/fa';

function NavList() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">

            <form
                onSubmit={handleSubmit}
                className='bg-slate-100 rounded-lg flex items-center'
            >
                <Input
                    type='text'
                    placeholder='Search...'
                    className='!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                ></Input>
                <button className='p-3'>
                    <FaSearch className='text-slate-600' />
                </button>
            </form>

            <NavListMenu />
            <Link to="search">
                <Typography
                    as="a"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                >
                    <ListItem className="flex items-center gap-2 py-2 pr-4">
                        Browse Our Listings Now!
                    </ListItem>
                </Typography>
            </Link>
        </List>
    );
}


import {
    UserCircleIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
} from "@heroicons/react/24/solid";
// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        link: "/profile"
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        link: "/profile"

    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
        link: "/profile"

    },
    {
        label: "Help",
        icon: LifebuoyIcon,
        link: "/profile"

    },

];

import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, } from '../redux/user/userSlice';


function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch(`/api/auth/signout`);
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(data.message));
        }
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src={currentUser.avatar} />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, link }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (<>
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Link to={link}>
                                <Typography
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color={"inherit"}
                                >
                                    {label}
                                </Typography>
                            </Link>

                        </MenuItem>

                    </>
                    );
                })}
                <button className="w-full text-start pl-4 p-2 hover:bg-red-100 hover:border-dashed">

                    <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color={"red"}
                        onClick={handleSignOut}

                    >
                        Sign Out
                    </Typography>
                </button>
            </MenuList>

        </Menu>
    );
}



import { useSelector } from 'react-redux';

export function NavbarWithMegaMenu() {
    const [openNav, setOpenNav] = React.useState(false);
    const { currentUser } = useSelector((state) => state.user);


    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <Navbar className="fixed top-0 z-10 mx-auto max-w-full px-5 py-2 ">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to="/">
                    <Typography
                        as="a"
                        variant="h6"
                        className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                    >
                        Sk Homes
                    </Typography>
                </Link>

                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-2 lg:flex">

                    {currentUser ? (
                        <ProfileMenu />
                    ) : (
                        <Link to="/sign-in">
                            <Button variant="gradient" size="sm"> Sign in</Button>
                        </Link>
                    )}


                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex w-full flex-nowrap ml-3 items-center lg:hidden">

                    {currentUser ? (
                        <ProfileMenu />
                    ) : (
                        <Link to="/sign-in">
                            <Button variant="gradient" size="sm"> Sign in</Button>
                        </Link>
                    )}

                </div>
            </Collapse>
        </Navbar>
    );
}