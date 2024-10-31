import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = false;
const user={
	activated: false
}

function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<Routes>
				{/* Using the reusable GuestRoute component */}
				<Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
				<Route path="/authenticate" element={<GuestRoute><Authenticate /></GuestRoute>} />


				<Route path="/activate" element={<SemiProtectedRoute><Activate /></SemiProtectedRoute>} />


				<Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />


				
			</Routes>
		</BrowserRouter>
	);
}

// Reusable GuestRoute component with conditional navigation
const GuestRoute = ({ children }) => {
	return isAuth ? <Navigate to="/rooms" replace /> : children;
};


const SemiProtectedRoute = ({ children }) => {
	return !isAuth ? <Navigate to="/" replace /> : isAuth && !user.activated? children : <Navigate to="/rooms" replace />;
};


const ProtectedRoute = ({ children }) => {
	return !isAuth ? <Navigate to="/" replace /> : isAuth && !user.activated?  <Navigate to="/activate" replace /> : children;
};

console.log(<GuestRoute />);


export default App;
