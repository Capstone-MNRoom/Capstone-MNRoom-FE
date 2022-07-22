import React from 'react';
import Router from 'next/router';
import Lottie from 'react-lottie';
import Layout from '../components/Layout';
import { TokenContext } from '../utils/context';
import LoadingDots from '../components/loading';
import { CardEvenList } from '../components/cards';
import { useState, useEffect, useContext } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const List = () => {

    const [loading, setLoading] = useState(true);
    const { token } = useContext(TokenContext);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        let myHeaders = new Headers();
        myHeaders.append(`Authorization`, `Bearer ${token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://mnroom.capstone.my.id/users/rooms`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                alert(result.message);
            })
            .finally(() => setLoading(false));
    }

    const handleDelete = (id) => {
        let myHeaders = new Headers();
        myHeaders.append(`Authorization`, `Bearer ${token}`);

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://mnroom.capstone.my.id/rooms/${id}`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                alert(result.message);
            })
            .catch((error) => {
                alert(result.message);
            })
            .finally(() => setLoading(false));
    }

    const handleEdit = (id) => {
        let myHeaders = new Headers();
        myHeaders.append(`Authorization`, `Bearer ${token}`);

        let formdata = new FormData();
        formdata.append(`image_room`, fileInput.files[0], image_room);
        formdata.append(`image_pengelola`, fileInput.files[0], image_pengelola);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`https://mnroom.capstone.my.id/rooms/${id}`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                Router.push(`/UpdateRoom/${id}`);
            })
            .catch((error) => {
                alert(result.message);
            })
            .finally(() => setLoading(false));
    }

    if (token !== '0') {
        if (loading) {
            return <LoadingDots/>;
        } else {
            return (
                <Layout>
                    <div className='text-center font-bold text-3xl text-orange-400 pt-12 pb-12'>
                        <h1>My Rooms</h1>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3 w-full border-b-4 grow flex border-gray-300 rounded border-r border-l'>
                                {data.map((item) => (
                                    <CardEvenList
                                        key={item.id}
                                        id={item.id}
                                        image={item.image_room}
                                        room={item.room_name}
                                        address={item.address}
                                        city={item.city}
                                        price={item.price}
                                    />
                                ))}
                                <div className='flex gap-x-4 text-right pl-56 drop-shadow-2xl'>
                                    <div>
                                        <EditIcon
                                            className='edit-icon text-sky-900'
                                            onClick={() => handleEdit()}
                                        />
                                    </div>
                                    <div className='text-rose-700'>
                                        <DeleteIcon
                                            className='delete-icon'
                                            onClick={() => handleDelete()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            )
        }
    } else {
        Router.push('/login');
    }
}

export default List;
