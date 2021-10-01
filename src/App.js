import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTodoList, isUserLoggedIn } from './redux/actions'
import Router from './routes'

const App = (props) => {

  const dispatch = useDispatch()
  const { authenticate } = useSelector(state => state.userDetails)

  useEffect(() => {
    !authenticate && dispatch(isUserLoggedIn())
    authenticate && dispatch(getAllTodoList())
  }, [authenticate])

  return <Router />
}

export default App