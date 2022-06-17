import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail2 from "./routes/Detail2";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Detail2 />
        </Route>
        <Route path="/movie/index/:index">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
