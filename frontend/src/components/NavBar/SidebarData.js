import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import *as IconName  from "react-icons/ai";
import *as GoIcon  from "react-icons/go";
import *as MdIcon  from "react-icons/md";
import logo from "../../images/logo2.png";
export const SidebarData = [
{
	title: "Home",
	path: "/",
	icon: <AiIcons.AiFillHome />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	// subNav: [
	// {
	// 	title: "Our Aim",
	// 	path: "/about-us/aim",
	// 	icon: <IoIcons.IoIosPaper />,
	// },
	// {
	// 	title: "Our Vision",
	// 	path: "/about-us/vision",
	// 	icon: <IoIcons.IoIosPaper />,
	// },
	
	// ],
},
{
	title: "Destination Managemet",
	path: "/destinations",
	icon: <FaIcons.FaMapMarkedAlt />,
},

{
	title: "Guide Managemet",
	path: "/get_guide",
	icon: <IconName.AiOutlineUser />,
},

{
	title: "Vehicle Managemet",
	path: "/viewVehicle",
	icon: <IconName.AiFillCar/>,
},
{
	title: "Accommodation Managemet",
	path: "/ManageDelivery",
	icon: <FaIcons.FaHotel />,
},

];
