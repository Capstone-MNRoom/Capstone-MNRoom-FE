import Image from 'next/image';
import Link from "next/link";
import React from "react";

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../assets/logo.png';

const Footer = () => {



  return (
    <div className="bg-[#085E7D] sm:text-left bottom-0">
      <div className="container">
        <div className="row text-white ml-2 pl-16">
          <div className="col-3">
            <Link href="http://localhost:3000">
            <h3 className='font-bold'>MN Room</h3>
            </Link>
            <br />
            <p className="text-sm">
              A web-based application that provides
              <br />a room loan at an affordable rental
              <br />
              price.
            </p>
            <br />
            <div>
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
            </div>
          </div>
          <div className="col-3">
            <h3 className="font-bold">Useful Links</h3>
            <br />
            <Link href='/Terms'>
            <p className="text-sm">Regulation</p>
            </Link>
            <Link href='/profile'>
            <p className="text-sm pt-1">Profile</p>
            </Link>
            <Link href='http://localhost:3000'>
            <p className="text-sm pt-1">Workspace</p>
            </Link>
            <Link href='http://localhost:3000'>
            <p className="text-sm pt-1">Hallroom</p>
            </Link>
            <Link href='http://localhost:3000'>
            <p className="text-sm pt-1">Ballroom</p>
            </Link>
          </div>
          <div className="col-3">
            <h3 className="font-bold">Contact</h3>
            <br />
            <p className="text-sm ">
              {" "}
              <HomeIcon /> Jl. Raya Tidar No. 23, Kota Malang
            </p>
            <p className="text-sm pt-2.5">
              {" "}
              <EmailIcon /> mainroom@gmail.com
            </p>
            <p className="text-sm pt-2.5">
              {" "}
              <CallIcon /> 0341-455667
            </p>
          </div>
          <br />
          <Link href='http://localhost:3000'>
          <div className='col-3 w-40'>
            <Image src={Logo} />
          </div>
          </Link>
        </div>
      </div>
      <hr />
      <div className="bg-white text-black text-center">
        <h6>2022 ©Copyright MN Room. All Right Reserved.</h6>
      </div>
    </div>
  );
}

export default Footer;