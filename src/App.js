import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Layout />} />
          <Route
            path="/repos/:userpath/:slug"
            element={
              <Layout>
                <Content />
              </Layout>
            }
          />
          <Route
            path="/repos/:userpath/:slug/info"
            element={
              <Layout>
                <Modal />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
