import React from 'react';
import ChatWebSocket from './ChatWebSocket';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {

    return (
        <Router>
            <nav>
                <Link to="/chat-1/">Go to Chat 1</Link>
                <br />
                <Link to="/chat-2/">Go to Chat 2</Link>
            </nav>

            <Routes>
                <Route path="/chat-1/" element={<ChatWebSocket
                    senderContentType={'cafe_branch'}
                    senderObjectId={29}
                    receiverContentType={'food_service_branch'}
                    receiverObjectId={5}
                />} />
                <Route path="/chat-2/" element={<ChatWebSocket
                    senderContentType={'food_service_branch'}
                    senderObjectId={5}
                    receiverContentType={'cafe_branch'}
                    receiverObjectId={29}
                />} />
            </Routes>
        </Router>
    );
};

export default App;
