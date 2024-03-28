
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerPage from './customer/customerPage';

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/customers">Customers</Link>
          {/* Add more links for other navigation items */}
        </nav>
        
        {/* Define routes for your application */}
        <Routes>
          <Route path="/customers" element={<CustomerPage />} />
          {/* Define other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <nav>
//         <Link to="/customers">Customers</Link>
//       </nav>
//       <Routes>
//           <Route path="/customers" element={<CustomerPage />} />
//           {/* Define other routes as needed */}
//         </Routes>
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }

export default App;
