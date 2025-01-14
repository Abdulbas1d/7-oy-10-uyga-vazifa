import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import JsonPlaceHolder from './pages/JsonPlaceHolder'
import ScrollPagination from './pages/ScrollPagination'

function App() {
  return (
    <div>
      <Routes>
        <Route index element = {<MainLayout><JsonPlaceHolder /></MainLayout>} />
        <Route path='/scrollPagination' element = {<MainLayout><ScrollPagination /></MainLayout>} />
      </Routes>
    </div>
  )
}

export default App
