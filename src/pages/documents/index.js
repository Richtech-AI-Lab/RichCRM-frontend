import React, { useState } from 'react';
import { login } from './auth'; // Import the login function
import OneDrivePicker from '../../components/onedrive/index';
import { useMsal } from '@azure/msal-react'; // Import useMsal from MSAL React

const App = () => {
  const { instance, accounts } = useMsal(); // Get MSAL instance and accounts using useMsal hook
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const user = await login();
      console.log('Logged in user:', user);

      // Check if any accounts are available
      if (accounts.length > 0) {
        instance.setActiveAccount(accounts[0]); // Set active account
      }

      setPickerOpen(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Open OneDrive Picker</button>
      {isPickerOpen && <OneDrivePicker onClose={() => setPickerOpen(false)} />}
    </div>
  );
};

export default App;
