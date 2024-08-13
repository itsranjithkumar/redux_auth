// import './App.css';
// import Login from './components/Login';
// import Home from './components/Home';
// import Layout from './components/Layout';
// import Editor from './components/Editor';
// import Admin from './components/Admin';
// import Missing from './components/Missing';
// import Unauthorized from './components/Unauthorized';
// import Lounge from './components/Lounge';
// import LinkPage from './components/LinkPage';
// import RequireAuth from './components/RequireAuth';
// import { Routes, Route } from 'react-router-dom';
// import PersistLogin from './components/PersistLogin';
// import Register from './components/Register';
import './App.css';
import Login from './features/auth/Login';
import Home from './features/auth/Home';
import Layout from './components/Layout';
import Editor from './features/auth/Editor';
import Admin from './features/auth/Admin';
import Missing from './components/Missing';
import Unauthorized from './features/auth/Unauthorized';
import Lounge from './features/auth/Lounge';
import LinkPage from './features/auth/LinkPage';
import RequireAuth from './features/auth/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import PersistLogin from './features/auth/PersistLogin';
import Register from './features/auth/Register';








const ROLES = { 
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150

}
function App() {
  return (
   <Routes>
    <Route path="/" element={<Layout />}>
    <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
<Route element={<PersistLogin />}> 
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin, ROLES.User]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>
        </Route>
        <Route path="*" element={<Missing />} />
    </Route>
   </Routes>
  );
}

export default App;