import React from 'react';
import Layout from '../components/Layout';

import PetsIcon from '@mui/icons-material/Pets';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const Terms = () => {
    return (
        <Layout>
            <div className='lg:text-4xl md:text-3xl text-xl text-[#F97316] flex justify-center font-bold my-16'>Regulation</div>

            <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 grid-flow-row auto-rows-max gap-16 lg:mx-28 md:mx-20 mx-10 mb-32'>
                <div className='space-y-1'>
                    <h1 id='regulationTitle' className='font-bold my-3'>Room Rules</h1>
                    <div><AccessTimeFilledIcon className='text-sm mr-2' />Start: 07.00 am</div>
                    <div><AccessTimeFilledIcon className='text-sm mr-2' />End: 22.00 pm</div>
                    <div><MeetingRoomIcon className='text-sm mr-2' />Entering the room with the room officer</div>
                    <div><PetsIcon className='text-sm mr-2' />Pets not allowed</div>
                    <div><NotInterestedIcon className='text-sm mr-2' />Parties or events outside the use of the room are not allowed</div>
                    <div><SmokeFreeIcon className='text-sm mr-2' />No smoking</div>
                </div>
                <div className='space-y-1'>
                    <h1 className='font-bold my-3'>Health and Safety</h1>
                    <div><AutoAwesomeIcon className='text-sm mr-2' />Keeping the COVID-19 protocol</div>
                    <div><NotificationImportantIcon className='text-sm mr-2' />Carbon monoxide alarm</div>
                    <div><NotificationImportantIcon className='text-sm mr-2' />Smoke alarm</div>
                </div>
                <div className='space-y-1'>
                    <h1 className='font-bold my-3'>Cancellation Rules</h1>
                    <div>Cancellations are made at least the 2nd day of the event.</div>
                    <div>Review the full cancellation policy that applies even if you cancel due to illness or disruption caused by COVID-19.</div>
                </div>
            </div>
        </Layout>
    )
}

export default Terms;