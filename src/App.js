
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation';
import Mainpage from './components/mainpage/mainpage';
import Allcards from './components/allcards/allcards';
import Mycards from './components/mycards/mycards';
import Users from './components/users/users';
import ObtainCards from './components/obtainCards/obtainCards';
import { UserContextProvider } from './usercontext/usercontext';
/*import { firestoreDB } from './service/firebase';
import { doc, updateDoc } from 'firebase/firestore';*/
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

function App() {

  const [userData, setUserData] = useState();

  useEffect(() => {
  getAuth().onAuthStateChanged((userCredentials) => {
    console.log("sesion iniciada de: ", userCredentials);
    setUserData(userCredentials);
  })
}, [userData])

  /*let timeClear = setInterval(() => {
    let hour = new Date();
    let a = hour.toLocaleTimeString();
    
    if(a === "00:00:00"){
    const decremetRef = doc(firestoreDB, "users", "ngaQFYSgpKSGkp2n9h1BoSfDA363");
    updateDoc(decremetRef, {
        obtains: 30
    });
    }
},1000);*/

  return (
    <div className="App">
      <UserContextProvider>
      <BrowserRouter>
        <Navigation userData={userData}></Navigation>
        <Routes>
          <Route path="/" element={<Mainpage/>} />
          <Route path="/Allcards" element={<Allcards/>} />
          <Route path="/CardsDetail/:name" />
          <Route path="/Mycards" element={<Mycards userData={userData}/>} />
          <Route path="/Users" element={<Users setUserData={setUserData} />} />
          <Route path="/ObtainCards" element={<ObtainCards userData={userData} />} />
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
