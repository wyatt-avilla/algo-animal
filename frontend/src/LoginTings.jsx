import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const callBackend = async () => {
    const token = await getAccessTokenSilently();
    const res = await fetch("http://localhost:8000/api/onboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin + "/homepage" } })}>
            Logout
          </button>
          <button onClick={callBackend}>Call Protected API</button>
        </>
      )}
    </div>
  );
};

export default App;
