import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';

import Calm from './calm';
import Basepage from './basepage'
import Past from './past'
import JournalEntryForm from './entries';



const Layout = () => {
    const [restId, setRestId] = useState()
    
    return (

        <BrowserRouter>

            <Routes>

                <Route exact path="/" element={<Login setRestId={setRestId} />} />
                
                <Route exact path="pages/login" element={<Login  restId={restId}/>} />
                <Route exact path="pages/calm" element={<Calm restId={restId} />} />
                <Route exact path="/basepage" element={<Basepage restId={restId} />} />
                <Route exact path="/past" element={<Past restId={restId}/> } />
                <Route exact path="/entries" element={<JournalEntryForm restId={restId}/>} />

            </Routes>

        </BrowserRouter>

    )
}
export default Layout