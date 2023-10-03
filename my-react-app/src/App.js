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
					<Route path="/admin" element={<Main />} />
					<Route path="/:guestId" element={<GuestInfo />} />
					<Route path="/" element={<GuestInvitation />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
