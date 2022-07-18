import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/button';
import Input from '../components/input';
import { useState } from 'react';
import { useEffect } from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const facilities = [
    'Meja',
    'Kursi',
    'Sound System',
    'Proyektor',
];

function CreateRoom() {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [nameRoom, setNameRoom] = useState("");
    const [price, setPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const [nameHotel, setNameHotel] = useState('');
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [category, setCategory] = useState('');
    const [facility, setFacility] = useState([]);

    // useEffect(() => {
    //     if (!token === "0") {
    //         router.push("/");
    //     }
    //     if (name && date && address && price && quota && description && status) {
    //         setDisabled(false);
    //     } else {
    //         setDisabled(true);
    //     }
    // }, []
    // );

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const body = {
            nameRoom,
            price,
            capacity,
            nameHotel,
            city,
            address,
            category,
            facility,
        };
        // var requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(body),
        // };
        // fetch("https://altaproject.online/events", requestOptions)
        //     .then((response) => response.json())
        //     .then((result) => {
        //         const { message, data, token } = result;
        //         if (message === "success") {
        //             localStorage.setItem("token", token);
        //             setToken(token);
        //             router.push("/");
        //         }
        //         alert(message);
        //     })
        //     .catch((err) => {
        //         alert(err.toString());
        //     })
        //     .finally(() => setLoading(false));
    }

    const handleMultySelect = (event) => {
        const {
            target: { value },
        } = event;
        setFacility(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSelect = (event) => {
        setCategory(event.target.value);
    };


    return (
        <Layout>
            <div id='createRoom' className='text-4xl text-[#F97316] flex justify-center font-bold my-16'>Create Room</div>

            <div className='flex justify-center'>
                <div className='border shadow-md w-[60%] mb-16 rounded-lg'>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className='my-16'>
                        <div className='space-y-3 flex flex-col w-[80%] m-auto'>
                            <Input
                                id='createRoomName'
                                type='text'
                                label='Name Room'
                                onChange={(e) => setNameRoom(e.target.value)}
                            />
                            <Input
                                id='createRoomPrice'
                                type='text'
                                label='Price'
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Input
                                id='createRoomCapacity'
                                type='text'
                                label='Capacity'
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                            <Input
                                id='createHotelName'
                                type='text'
                                label='Name Hotel'
                                onChange={(e) => setNameHotel(e.target.value)}
                            />
                            <Input
                                id='createHotelCity'
                                type='text'
                                label='City'
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <Input
                                id='createHotelAddress'
                                type='text'
                                label='Address'
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    id='dropdownCategory'
                                    value={category}
                                    label='Category'
                                    onChange={handleSelect}
                                >
                                    <MenuItem value='workspace'>Workspace</MenuItem>
                                    <MenuItem value='hallroom'>Hallroom</MenuItem>
                                    <MenuItem value='ballroom'>Ballroom</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel>Facility</InputLabel>
                                <Select
                                    id='dropdownFacility'
                                    multiple
                                    value={facility}
                                    onChange={handleMultySelect}
                                    input={<OutlinedInput label='Facility' />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {facilities.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox checked={facility.indexOf(item) > -1} />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='flex justify-center mt-10'>
                            <Button
                                id="btnCreateRoom"
                                className={`bg-[#F97316] text-white font-bold py-2 px-14 border border-white rounded-lg shadow-md shadow-gray-300 ${loading && "bg-orange-200 cursor-not-allowed"
                                    }`}
                                label="Create"
                                loading={loading || disabled}
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default CreateRoom