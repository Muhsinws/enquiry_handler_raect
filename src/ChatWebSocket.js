import React, { useEffect, useState } from 'react';

const ChatWebSocket = ({ senderContentType, senderObjectId, receiverContentType, receiverObjectId }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Construct WebSocket URL
        const url = `ws://localhost:8000/ws/chat/${senderContentType}/${senderObjectId}/${receiverContentType}/${receiverObjectId}/`;
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // Check if the message is an object and extract the text if necessary
            if (data.message) {
                // If data.message is an object, extract the text. Otherwise, use it directly.
                const messageText = typeof data.message === 'object' ? data.message.text : data.message;
                setMessages((prevMessages) => [...prevMessages, messageText]);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [senderContentType, senderObjectId, receiverContentType, receiverObjectId]);

    const sendMessage = () => {
        if (socket && message.trim()) { // Ensure the message is not empty
            const messageData = {
                message,
                content_type: 'text', // or whatever content type you need
            };
            socket.send(JSON.stringify(messageData));
            setMessage(''); // Clear the input after sending
        }
    };

    return (
        <div>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li> // msg should be a string
                    ))}
                </ul>
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatWebSocket;
