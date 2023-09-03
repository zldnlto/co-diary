import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { useLocation, useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import { authState, isLoggedIn, UserIdState } from './atom/authRecoil';
import Router from './routes/Router';
import { appAuth, firestore } from './firebase';
import { pcMediaQuery } from './styles/MediaQuery';

const Container = styled.div`
  > main {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media ${pcMediaQuery} {
    width: 100%;
    height: 100%;
    max-width: 44rem;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 8px;
  }
`;

function App() {
  const queryClient = new QueryClient();

  const setUserState = useSetRecoilState(authState);
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);

  const [userId, setUserId] = useRecoilState(UserIdState);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      setUserState(user);
      setIsLoadingData(false);

      if (user) {
        setUserId(user.uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  console.log(userId);

  useEffect(() => {
    console.log(firestore);
    const users = firestore.collection('users');

    users
      .doc('jSwWPHGDKXx2yXINq7K8')
      .get()
      .then((doc) => {
        console.log(doc.data());
        console.log(doc.id);
      });
  });

  if (isLoadingData) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Container>
          <Router />
        </Container>
      </div>
    </QueryClientProvider>
  );
}

export default App;
