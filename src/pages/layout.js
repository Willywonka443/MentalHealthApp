import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';

import Calm from './calm';
import Basepage from './basepage'
import Past from './past'
import JournalEntryForm from './entries';



const Layout = () => {
    const [ setRestId] = useState()
    
    return (

        <BrowserRouter>

            <Routes>

                <Route exact path="/" element={<Login setRestId={setRestId} />} />
                
                <Route exact path="/login" element={<Login  setRestId={setRestId}/>} />
                <Route exact path="/calm" element={<Calm restId={setRestId} />} />
                <Route exact path="/basepage" element={<Basepage restId={setRestId} />} />
                <Route exact path="/past" element={<Past restId={setRestId}/> } />
                <Route exact path="/entries" element={<JournalEntryForm restId={setRestId}/>} />

            </Routes>

        </BrowserRouter>

    )
}
export default Layout