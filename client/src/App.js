 
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import NavBar from './components/layout/NavBar'; 
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';


const App = () => {

  return (
     
    <ContactState>
        <Router> 
            <>
              <NavBar/> 
                <div className='container middle'>
                   <Switch>
                       <Route exact path='/' component={Home}/>
                       <Route exact path='/about' component={About}/>
                   </Switch>
                </div>
            </>
        </Router>s
    </ContactState>
          
  );
}

export default App;
