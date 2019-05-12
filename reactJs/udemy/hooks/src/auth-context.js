import React from 'react';

const authContext = React.createContext({sstatus: false, login: () => {}});

export default authContext;