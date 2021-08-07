import 'semantic-ui-css/semantic.min.css'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import  { BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/auth'
import AuthRedirect from './utils/AuthRedirect'

import Header from './components/Header/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import SinglePost from './pages/SinglePost'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Container>
        <ToastContainer
            autoClose={3000}
            className="toast-container"/>
        <Header />
        <Route exact path='/' component={Home}/>
        <AuthRedirect exact path='/login' component={Login} />
        <AuthRedirect exact path='/register' component={Register} />
        <Route exact path='/post/:postId' component={SinglePost}/>
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
