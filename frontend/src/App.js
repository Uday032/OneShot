import './App.css';
import {Nav, Tab, Container} from 'react-bootstrap'

import DashBoard from './components/DashBoard'
import MainPage from './components/MainPage'
import Charts from './components/Charts'

//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Nav variant="pills" className="row">
            <Nav.Item>
              <Nav.Link eventKey="first">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">DashBoard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Charts</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <MainPage />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <DashBoard />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <Charts />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default App;
