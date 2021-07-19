import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { FormDataCheck } from './Step4';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Router>
    <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Step1}/>
        <Route exact path="/step2" component={Step2}/>
        <Route exact path="/step3" component={Step3}/>
        <Route exact path="/step4" component={FormDataCheck}/>
      </Switch>
    </Router>
  </>
  );
}

export default App;
