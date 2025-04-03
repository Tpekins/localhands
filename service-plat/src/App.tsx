import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  ScrollRestoration,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import SignupScreen from './pages/auth/signup';
import Login from './pages/auth/login';
import LandingPage from './pages/landing/landing';
import DashboardLayout from './components/Layout/Dashboard';
import Dashboard from './pages/Dashboard';
import Contracts from './pages/Contracts';
import Proposals from './pages/Proposals';
import Profile from './pages/Profile';
import JobForm from './pages/JobForm';
import Offers from './pages/Offers';
import Applications from './pages/Applications';
import { useUser } from './contexts/userContext';
// import Navbar from './components/navabr';
import SearchList from "./pages/search/Search";



function App() {
  const { user } = useUser()
  return (
    <div className="font-bodyFont">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/signin" element={<Login />} />
            {/* ==================== Header Navlink Start here =================== */}
          {/* <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />}></Route>
            <Route path="/search" element={<SearchList />}></Route>
          </Route> */}
          {/* Protected Routes */}
          <Route path="/search" element={<SearchList />}></Route>
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/contracts"
            element={
              <DashboardLayout>
                <Contracts />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/proposals"
            element={
              <DashboardLayout>
                <Proposals />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/offers"
            element={
              <DashboardLayout>
                <Offers />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/offers/create"
            element={
              <DashboardLayout>
                <JobForm />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/offers/edit/:id"
            element={
              <DashboardLayout>
                <JobForm />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <DashboardLayout>
                <Applications />
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
