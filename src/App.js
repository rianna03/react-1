// import logo from './logo.svg';
// import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AllStudents from './components/AllStudents.js';
import EditStudent from './components/EditStudent.js';
import Register from './components/Register.js';


function App() {
  return (
    <div className="App">
        <Router>
      <div className="App">
       <Navbar></Navbar>
      <div className='content'>
       <Switch>

         <Route path="/login">
          <Login></Login>
         </Route>

         <Route path="/register">
          <Register></Register>
         </Route>

         <Route path="/addStudent">
          <AddStudent></AddStudent>
         </Route>

         <Route path="/students">
          <AllStudents></AllStudents>
         </Route>

         <Route path="/updateStudent/:_id">
          <EditStudent></EditStudent>
         </Route>
        
       </Switch>
      </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
