import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import Image from 'next/image';
import Logo from '../assets/logo.png';

export default function Footer() {
  return (
    <div className='bg-sky-900 sm:text-left'>
      <div className="container">
        <div className="row text-white ml-2 pl-16">
          <div className="col-3">
            <h3 className='font-bold'>MN Room</h3>
            <br/>
            <p className="text-sm">A web-based application that provides<br />a room loan at an affordable rental<br />price.</p>
            <br/>
            <div>
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
            </div>
          </div>
          <div className="col-3">
            <h3 className='font-bold'>Useful Links</h3>
            <br/>
            <p className="text-sm">Regulation</p>
            <p className="text-sm pt-1">Profile</p>
            <p className="text-sm pt-1">Workspace</p>
            <p className="text-sm pt-1">Hallroom</p>
            <p className="text-sm pt-1">Ballroom</p>
          </div>
          <div className="col-3">
            <h3 className='font-bold'>Contact</h3>
            <br/>
            <p className="text-sm "> <HomeIcon /> Jl. Raya Tidar No. 23, Kota Malang</p>
            <p className="text-sm pt-2.5"> <EmailIcon /> main@gmail.com</p>
            <p className="text-sm pt-2.5"> <CallIcon /> 0341-455667</p>
          </div>
          <br/>
          <div className='col-3 w-40'>
            <Image src={Logo}/>
          </div>
        </div>
      </div>
      <hr />
      <div className="bg-white text-black text-center">
        <h6>2022 ©Copyright MNroom. All Right Reserved.</h6>
      </div>
    </div>
  );
}
