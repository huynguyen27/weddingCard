import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './Main';
import GuestInfo from './GuestInfo'; // Assuming you have a GuestInfo component
import GuestInvitation from './GuestInvitation';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/admin" element={<Main />} /> {/* Explicitly name admin */}
					<Route path="/guest/:guestId" element={<GuestInfo />} /> {/* Explicit path for guests */}
					<Route path="/" element={<GuestInvitation />} />
				</Routes>
			</Router>
		</>
	);
};
export default App;
