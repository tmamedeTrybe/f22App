/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useState } from 'react';
import MyContext from './myContext';
import HdContext from './HdContext';

function MyProvider({ children }) {
  const [jobsFounded, setjobsFounded] = useState('');
  const [user, setUser] = useState('');
  const [hdsFounded, setHdsFounded] = useState('');

  const changeJobs = useCallback((jobs) => {
    setjobsFounded(jobs);
  }, [setjobsFounded]);

  const filterJob = useCallback((id) => {
    const jobFilter = jobsFounded.find((job) => job.id === Number(id));
    return jobFilter;
  }, [jobsFounded]);

  const changeHds = useCallback((hds) => {
    setHdsFounded(hds);
  }, [setHdsFounded]);

  const value = useMemo(() => ({
    jobsFounded, user, setUser, changeJobs, filterJob,
  }), [jobsFounded, user, changeJobs, filterJob]);

  const valueHd = useMemo(() => ({
    hdsFounded, changeHds,
  }), [hdsFounded, changeHds]);

  return (
    <div>
      <MyContext.Provider value={ value }>
        <HdContext.Provider value={ valueHd }>
          { children }
        </HdContext.Provider>
      </MyContext.Provider>
    </div>
  );
}

export default MyProvider;
