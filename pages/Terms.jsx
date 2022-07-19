import React from 'react';
import Layout from '../components/Layout';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PetsIcon from '@mui/icons-material/Pets';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';



function terms() {
    return (
        <Layout>
            <div className='text-4xl text-[#F97316] flex justify-center font-bold my-16'>Aturan yang Harus Dipatuhi</div>

            <div className='grid grid-cols-3 grid-flow-row auto-rows-max gap-16 mx-16 mb-32'>
                <div className='space-y-1'>
                    <h1 className='font-bold my-3'>Peraturan Ruangan</h1>
                    <div><AccessTimeFilledIcon className='text-sm mr-2' />Start: Setelah 06.00</div>
                    <div><AccessTimeFilledIcon className='text-sm mr-2' />End: 23.59</div>
                    <div><MeetingRoomIcon className='text-sm mr-2' />Memasuki ruangan dengan petugas ruangan</div>
                    <div><PetsIcon className='text-sm mr-2' />Hewan peliharaan tidak diizinkan</div>
                    <div><NotInterestedIcon className='text-sm mr-2' />Pesta atau acara diluar kegunaan ruangan tidak diperkenankan</div>
                    <div><SmokeFreeIcon className='text-sm mr-2' />Dilarang merokok</div>
                </div>
                <div className='space-y-1'>
                    <h1 className='font-bold my-3'>Kesehatan & Keselamatan</h1>
                    <div><AutoAwesomeIcon className='text-sm mr-2' />Menjaga protokol COVID-19</div>
                    <div><NotificationImportantIcon className='text-sm mr-2' />Alarm karbon monoksida</div>
                    <div><NotificationImportantIcon className='text-sm mr-2' />Alarm asap</div>
                </div>
                <div className='space-y-1'>
                    <h1 className='font-bold my-3'>Kebijakan Pembatalan</h1>
                    <div>Pembatalan dilakukan minimal H-2 acara.</div>
                    <div>Tinjau kebijakan pembatalan lengkap yang berlaku bahkan jika Anda membatalkan karena penyakit atau gangguan yang disebabkan oleh COVID-19.</div>
                </div>
            </div>
        </Layout>
    )
}

export default terms