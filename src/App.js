
import Summary from "./Pages/Summary/Summary";
import CSAn from "./Pages/CSAAnalysis/CSAn";
import Alerts from "./Pages/Alerts/Alerts";
import { BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Summary/>}/>
          <Route path="/summary" element={<Summary/>}/>
          <Route path="/analysis" element={<CSAn/>}/>
          <Route path="/alerts" element={<Alerts/>}/>
        </Route>
       </Routes>
    </div>
  );
}

export default App;
