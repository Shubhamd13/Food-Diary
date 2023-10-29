import React from "react";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorPage from "./error-page";
import Homepage from "./Homepage";
import PrivateRoutes from "../utils/PrivateRoutes";
import { AuthProvider } from "../utils/AuthContext";
import DatePage from "./DateComponets/DatePage";
import TestPage from "./TestPage";

function App  (){
		
		return(
			<Router>
				<AuthProvider>
					<Routes>
          				<Route path="/login" element={<Login/>}/>
          				<Route path="/testPage" element={<TestPage/>}/>
					  	<Route path="*" element={<ErrorPage/>}/>
						<Route element={<PrivateRoutes />}>
					  		<Route path="/" element={<Homepage/>}/>
					  		<Route path="/datepage/:passedDate" element={<DatePage/>}/>
						</Route>
					</Routes>
				</AuthProvider>
			</Router>	
		)
}
export default App;