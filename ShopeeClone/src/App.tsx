import { ToastContainer } from 'react-toastify'
import RouteElement from './RouteElement'

function App() {
  const routeElement = RouteElement()
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
