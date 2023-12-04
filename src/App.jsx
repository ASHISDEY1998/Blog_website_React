import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from "./store/authSlice"
import authService from "./appwrite/auth"
import './App.css'
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header></Header>
        <main>
          todo
          {/* <Outlet></Outlet> */}
        </main>
        <Footer></Footer>
      </div>
    </div>
  ) : null
}

export default App
