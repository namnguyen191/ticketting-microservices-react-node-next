import React from 'react';
import buildClient from '../api/build-client';

const index = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in </h1> : <h1>You are NOT signed in</h1>;
};

index.getInitialProps = async (context) => {
  const client = buildClient(context);

  const { data } = await client.get('/api/users/currentuser');

  return data;
};

// // This gets called on every request
// export const getServerSideProps = async (context) => {
//   const client = buildClient(context);

//   const { data } = await client.get('/api/users/currentuser');

//   // Pass data to the page via props
//   return { props: { data } };
// };

export default index;
