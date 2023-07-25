import './App.css';
import {Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Categories from './pages/Categories';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPass from './pages/Auth/ForgotPass';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/dashboard' element={<PrivateRoute/>} >
          <Route path='user' element={<Dashboard/>} />
          <Route path='user/orders' element={<Orders/>} />
          <Route path='user/profile' element={<Profile/>} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>} >
          <Route path='admin' element={<AdminDashboard/>} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/create-product' element={<CreateProduct/>} />
          <Route path='admin/users' element={<Users/>} />
          <Route path='admin/products' element={<Products/>} />
        </Route>
        <Route path='/contact' element={<Contact/>} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='/category' element={<Categories/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-pass' element={<ForgotPass/>} />
        <Route path='*' element={<Pagenotfound/>} />
      </Routes>
    </>
  );
}

export default App;
