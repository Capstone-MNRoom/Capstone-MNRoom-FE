import Layout from '../components/Layout'
import React, { Component } from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import Image from 'next/image'
import { useState } from 'react'
import Photo from '../assets/detail-photo.png'
import SellIcon from '@mui/icons-material/Sell';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChairIcon from '@mui/icons-material/Chair';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import CastIcon from '@mui/icons-material/Cast';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


const Detail = () => {

  const [value, setValue] = useState(new Date());

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

 const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  

  return (
    <Layout>
      <div className='pl-8 pb-10'>
        <div className='font-bold text-3xl text-orange-400 pt-12 pb-2'>
          <h1>Sasana Krida Resort</h1>
        </div>
        <div className='flex'>
          <PlaceIcon />
          <p>Kota Malang, Jawa Timur, Indonesia</p>
        </div>
      </div>

      <div className='pl-14 pr-14'>
        <Image src={Photo} />
      </div>
      <hr />
      <div className='container '>
        <div className='row'>
          <div className='col-6 pl-32 pt-8 pb-4'>
            <h3 className='text-2xl font-bold'>Rahwana Room</h3>
            <div className='flex pt-4 pb-3 text-lg'>
              <SellIcon />
              <p>Rp 2.000.000 / day</p>
            </div>
            <div className='flex text-lg'>
              <PersonIcon />
              <p>100 - 500 people</p>
            </div>
          </div>
          <div className='col-6 '>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="year"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <hr />

      <div className='font-bold pl-36 pt-8 pb-8 text-xl'>
        <h3>Facility</h3>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-6 pl-56 text-lg'>
            <div className='flex'>
              <LocalDiningIcon />
              <p>Catering</p>
            </div>
            <div className='flex pt-4'>
              <FilterVintageIcon />
              <p>Decoration</p>
            </div>
            <div className='flex pt-4'>
              <BusinessCenterIcon />
              <p>Stuff</p>
            </div>
            <div className='flex pt-4'>
              <ChairIcon />
              <p>Chairs</p>
            </div>
          </div>
          <div className='col-6'>
            <div className='flex'>
              <TableRestaurantIcon />
              <p>Tables</p>
            </div>
            <div className='flex pt-4'>
              <CastIcon />
              <p>Proyector</p>
            </div>
            <div className='flex pt-4'>
              <AcUnitIcon />
              <p>Air Conditioner</p>
            </div>
            <div className='flex pt-4'>
              <WifiIcon />
              <p>Wifi Connection</p>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
      <hr />
      <div className='font-bold pl-36 pt-8 pb-8 text-xl'>
        <h3>Feedback</h3>
      </div>





    </Layout>
  )

}

export default Detail;
