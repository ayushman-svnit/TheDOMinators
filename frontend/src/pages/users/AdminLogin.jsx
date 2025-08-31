// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import NotFound from "../../NotFound";
// function AdminLogin({ setIsAdmin, setUser, setToken }) {
//   const location = useLocation();
//   const navigate = useNavigate();


//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const key = params.get('key');
//     if (!key)
//       console.log('no key provided');
//     console.log("useEffect fired with key:", key);
//     if (key) {
//       console.log("Making request to:", `/api/admin/login?key=${key}`);
//       axios.get(`/api/admin/login?key=${key}`, {
//         withCredentials: true
//       })
//         .then((res) => {
//           console.log("Axios request succeeded:", res);
//           localStorage.setItem('token', res.data.token);
//           setToken(res.data.token);
//           setIsAdmin(true);
//           setUser(null);
//           navigate('/admin/dashboard');
//         })
//         .catch((err) => {
//           console.error("Axios request failed:", err);
//           setError(true);
//         });
//     } else {
//       setError(true);
//     }
//   }, [location.search]);
//   if (error) {
//     return <NotFound />;
//   }
//   return;
// }

// export default AdminLogin;

import React, { useEffect, useState } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin({ setIsAdmin, setUser, setToken }) {
  const location = useLocation();
  const navigate = useNavigate();

  
  const [error, setError] = useState(null);
  
  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const key = params.get('key');
  if(!key)
    console.log('no key provided');
  console.log("useEffect fired with key:", key);
  navigate('/');
  if (key) {
    console.log("Making request to:", `/api/admin/login?key=${key}`);
    axios.get(`/api/admin/login?key=${key}`, {
      withCredentials: true
    })
      .then((res) => {
        console.log("Axios request succeeded:", res);
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setIsAdmin(true);
        setUser(null);
        navigate('/admin/dashboard');
      })
      .catch((err) => {
        console.error('Axios request failed:', err);
        if (err.response) {
          setError(err.response.data.message || 'Login failed');
        } else {
          setError('Server error');
        }
      });
  } else {
    setError('No key provided');
  }
}, [location.search]);
  return;
}

export default AdminLogin;