import React, { useEffect } from 'react';
import getMessages, { markMessageAsRead } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import '../index.css';

const Popup = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.messages);
    const status = useSelector((state) => state.messages.status);
    const error = useSelector((state) => state.messages.error);

    useEffect(() => {
       if(status === 'idle') {
           dispatch(getMessages());
       }
    }, [status, dispatch]);

    const handleReadMessages = (id) => {
       dispatch(markMessageAsRead(id));
    }

    if(status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900" />
            <p className="text-lg font-bold text-gray-600 mt-4">Loading...</p>
          </div>
        )
    }
    if(status === 'failed') {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-lg font-bold text-gray-600 mt-4">{error}</p>
          </div>
        )
    }
    if(messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-lg font-bold text-gray-600 mt-4">No messages found</p>
          </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-lg font-bold text-gray-600 mt-4">Messages</h1>  
            {messages.map((message) => (
                <Message key={message.id} message={message} onMarkAsRead={handleReadMessages} />
            ))}
        </div>
    )
}

export default Popup