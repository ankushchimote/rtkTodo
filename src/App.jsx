

import './App.css'
import Heading from './components/Heading'
import TodoList from './components/TodoList'

function App() {


  return (
    <>
    <div className='container py-16 px-6 min-h-screen mx-auto'>
      <Heading/>
      <TodoList/>
    </div>
    </>
  )
}

export default App
