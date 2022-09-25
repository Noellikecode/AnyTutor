import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom
} from "@100mslive/hms-video-react";
import TitlePage from "./components/TitlePage";
import Preview from "./components/Preview";
import Room from "./components/Room";
import Chat from "./components/Chat";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const endPoint =
  "https://prod-in2.100ms.live/hmsapi/thing2-test.app.100ms.live/";

const getToken = async (user_id) => {
  const response = await fetch(`${endPoint}api/token`, {
    method: "POST",
    body: JSON.stringify({
      user_id,
      role: "host", //host, teacher, guest, student
      type: "app",
      room_id: "632f3b984208780bf664223b"
    })
  });
  const { token } = await response.json();
  return token;
};

const App = () => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const handleSubmit = async (userName) => {
    const token = await getToken(userName);
    hmsActions.join({ authToken: token, userName });
  };
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/call">
            {isConnected ? <Room /> : <Preview handleSubmit={handleSubmit} />}
          </Route>

          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/">
            <TitlePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
