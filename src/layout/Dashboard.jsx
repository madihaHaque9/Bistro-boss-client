import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils, FaVoicemail } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseCart from "../hooks/UseCart";
import UseAdmin from "../hooks/UseAdmin";


const Dashboard = () => {
    const [cart]=UseCart();
     const [isAdmin]=UseAdmin();
     console.log(isAdmin)
    return (
        <div className="flex">
          <div className="w-64 min-h-screen bg-orange-400">
            <ul className="menu p-4">
         {
            isAdmin? <>
               <li>
                    
                    <NavLink to='/dashboard/adminhome'><FaHome></FaHome>Admin Home</NavLink></li>
                    <li>
                            
                    <NavLink to='/dashboard/additems'><FaUtensils></FaUtensils>Add Items</NavLink></li>
                    <li>
                            
                    <NavLink to='/dashboard/manageItems'><FaList></FaList>Manage Items</NavLink></li>
                    <li>
                            
                    <NavLink to='/dashboard/bookings'><FaBook></FaBook>Manage Bookings</NavLink></li>
                     <li>
                            
                    <NavLink to='/dashboard/users'><FaUser></FaUser>All Users</NavLink></li>
            </>
            :
            <>
               <li>
                    
                    <NavLink to='/dashboard/userhome'><FaHome></FaHome>User Home</NavLink></li>
                    <li>
                            
                    <NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart>My Cart:({cart.length})</NavLink></li>
                    <li>
                            
                    <NavLink to='/dashboard/paymentHistory'><FaCalendar></FaCalendar>Reservation</NavLink></li>
                    <li>
                            
                    <NavLink to='/dashboard/review'><FaAd></FaAd> Add a Review</NavLink></li>
                     <li>
                            
                    <NavLink to='/dashboard/History'><FaList></FaList>Payment History</NavLink></li></>
         }
            <div className="divider"></div>
            <li>
            <NavLink to='/'>
            <FaHome></FaHome> Home
            </NavLink>
            </li>
            <li>
            <NavLink to='/order/salad'>
            <FaSearch></FaSearch> Menu
            </NavLink>
            </li>
            <li>
            <NavLink to='/order/contact'>
            <FaEnvelope></FaEnvelope> Contact
            </NavLink>
            </li>
                    
                    
               
            </ul>
            </div> 
            <div className="flex-1 p-8">
                <Outlet></Outlet>
                </div> 
        </div>
    );
};

export default Dashboard;