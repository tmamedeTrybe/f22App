/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState } from 'react';
import MyContext from './myContext';

function MyProvider({ children }) {
  const [jobsFounded, setjobsFounded] = useState('');
  const [user, setUser] = useState('');

  const changeJobs = useCallback((jobs) => {
    setjobsFounded(jobs);
  }, [setjobsFounded]);

  const value = useMemo(() => ({
    jobsFounded, user, setUser, changeJobs,
  }), [jobsFounded, user, changeJobs]);

  return (
    <div>
      <MyContext.Provider value={ value }>
        { children }
      </MyContext.Provider>
    </div>
  );
}

export default MyProvider;
