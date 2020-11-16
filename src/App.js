import "./App.css";
import SimpleContainer from "./components/simpleContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AddNotes from "./components/AddNotes";
import AddClips from './components/AddClip'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SimpleContainer} />
          <Route exact path="/addnotes" component={AddNotes} />
          <Route exact path="/addclip" component={AddClips} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
