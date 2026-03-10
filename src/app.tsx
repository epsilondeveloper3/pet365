import { useState, useEffect } from 'preact/hooks';
import Router from 'preact-router';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { OTP } from './pages/OTP/OTP';
import { Loader } from './components/Loader';
import { BecomeProvider1 } from './pages/BecomeProvider1/BecomeProvider1';
import { BecomeProvider2 } from './pages/BecomeProvider2/BecomeProvider2';
import { BecomeProvider3 } from './pages/BecomeProvider3/BecomeProvider3';
import { PetOwnerDetails } from './pages/PetOwnerDetails/PetOwnerDetails';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Booking } from './pages/Booking/Booking';
import { Search } from './pages/Search/Search';
import { Chats } from './pages/Chats/Chats';
import { Notifications } from './pages/Notifications/Notifications';
import { AddPet } from './pages/AddPet/AddPet';
import { MyPets } from './pages/MyPets/MyPets';
import { ChatDetail } from './pages/ChatDetail/ChatDetail';
import { Profile } from './pages/Profile/Profile';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { ServiceDetail } from './pages/ServiceDetail/ServiceDetail';
import { PrivacyPolicy, HelpSupport } from './pages/StaticPages/StaticPages';

import { SidebarProvider } from './context/SidebarContext';
import { Sidebar } from './components/Sidebar';

export function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <SidebarProvider>
      <div id="app-container">
        <Sidebar />
        <Router>
          <Login path="/" />
          <Register path="/register" />
          <OTP path="/otp" />
          <BecomeProvider1 path="/become-provider-1" />
          <BecomeProvider2 path="/become-provider-2" />
          <BecomeProvider3 path="/become-provider-3" />
          <PetOwnerDetails path="/pet-owner-details" />
          <Dashboard path="/dashboard" />
          <Notifications path="/notifications" />
          <AddPet path="/add-pet" />
          <AddPet path="/edit-pet/:id" />
          <MyPets path="/my-pets" />
          <Booking path="/booking" />
          <Search path="/search" />
          <Chats path="/chats" />
          <ChatDetail path="/chat-detail/:id" />
          <Profile path="/profile" />
          <EditProfile path="/edit-profile" />
          <ServiceDetail path="/service-detail/:id" />
          <PrivacyPolicy path="/privacy" />
          <HelpSupport path="/support" />
        </Router>
      </div>
    </SidebarProvider>
  );
}
