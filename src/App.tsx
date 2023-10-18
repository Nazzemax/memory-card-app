import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAppDispatch, useAppSelector } from './app/hooks'
import Header from './components/partials/Header'
import Form from './components/shared/Form'

const App:React.FC = () => {
  const dispatch = useAppDispatch()
  
  return (
    <>    
    <div className='bg-[#F9F9FA]'>
    <Header />
      <main 
        className='flex mx-auto' 
        style={{justifyContent:'center'}}>
        <Form />
      </main>
    </div>
    </>
  )
}

export default App
