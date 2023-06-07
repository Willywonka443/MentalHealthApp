import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import EditEntry from './editentries'
import Calm from './calm';
import Basepage from './basepage'
import Past from './past'
import JournalEntryForm from './entries';
import CreateAccount from './account';
import ProfessionalEntries from './professionalentries';



const Layout = () => {
    const [restId, setRestId] = useState('')
    


    return (

        <BrowserRouter>

            <Routes>

                <Route exact path="/" element={<Login setRestId={setRestId} />} />
                
                <Route exact path="/login" element={<Login setRestId={setRestId} />} />
                <Route exact path="/calm" element={<Calm restId={restId} />} />
                <Route exact path="/basepage" element={<Basepage restId={restId} />} />
                <Route exact path="/past" element={<Past restId={restId}/> } />
                <Route exact path="/entries" element={<JournalEntryForm restId={restId}/>} />
                <Route exact path="/account" element={<CreateAccount restId={restId}/>} />
                <Route exact path="/editentries/:journalId" element={<EditEntry restId={restId}/>} />
                <Route exact path="/professionalentries" element={<ProfessionalEntries restId={restId}/>} />

            </Routes>

        </BrowserRouter>

    )
}
export default Layout