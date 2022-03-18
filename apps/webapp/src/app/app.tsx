import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../home'
import { Link } from '../link'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/link/:id' element={<Link />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
