import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from './assets/themeSlice'

function App() {
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>{theme}</h1>
      <button onClick={() => dispatch(changeTheme())}>Click me!</button>
    </div>
  )
}


export default App
{/* <div className={classNames({ [styles.wrapper]: true, [styles.darkmode]: theme === 'dark', [styles.lightmode]: theme === 'light' })}> */ }
