import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAppDispatch, useAppSelector } from './app/hooks'
import Header from './components/partials/Header'
import Form from './components/shared/Form'

function App() {
  const dispatch = useAppDispatch()
  
  return (
    <>
    <div className='bg-[#F9F9FA]'>
      <Header />
      <main 
        className='container flex' 
        style={{justifyContent:'center'}}>
        <Form />
      </main>
    </div>
   
   
    </>
  )
}

export default App
