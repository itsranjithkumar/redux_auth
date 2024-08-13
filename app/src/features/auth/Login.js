import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {

    const useRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setpwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(()=>{
      useRef.current.focus()

    },[])

    useEffect(()=>{
      setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        const userData = await login({ user, pwd })
        dispatch(setCredentials({ ...userData, user}))
        setUser('')
        setpwd('')
        navigate('/welcome')
      } catch (err) {
        if (!err.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
        errRef.current.focus();


      }
    };

    return (
      <section style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
          <p ref={errRef} style={{ color: 'red', visibility: errMsg ? 'visible' : 'hidden' }} aria-live="assertive">
              {errMsg}
          </p>
          <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Sign In</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="username" style={{ marginBottom: '10px' }}>Username:</label>
              <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
              />

              <label htmlFor="password" style={{ marginBottom: '10px' }}>Password:</label>
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
              />

              <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
                  Sign In
              </button>

              <div style={{ marginTop: '20px' }}>
                  <input
                      type='checkbox'
                      id='persist'
                      onChange={toggleCheck}
                      checked={check}
                      style={{ marginRight: '10px' }}
                  />
                  <label htmlFor='persist'>Trust this device</label>
              </div>
          </form>
          <p style={{ marginTop: '20px' }}>
              Need an Account?<br />
              <span style={{ fontWeight: 'bold', color: '#007bff' }}>
                  <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>Sign Up</Link>
              </span>
          </p>
      </section>
  );
};

export default Login;