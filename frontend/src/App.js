import './App.css';
import {Container} from 'react-bootstrap'

import Tables from './components/TableHeader'

//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Container>
        <Tables />
      </Container>
    </div>
  );
}

export default App;
