import ReactDOM from 'react-dom/client';
import 'bootstrap/scss/bootstrap.scss';
 import './index.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { MotionConfig } from 'motion/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig viewport={{once:true}}>
         <App />
      </MotionConfig>
     </AppProvider>
  </BrowserRouter>
    
);

