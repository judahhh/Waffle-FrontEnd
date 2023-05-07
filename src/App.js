import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import Register from "./pages/register/Index";
import ChatPage from "./pages/chat/ChatPage";
import ChatDetail from "./pages/chat/ChatDetail";
import VideoPage from "./pages/videochat/VideoPage";
import VideoPage2 from "./pages/videochat/VideoPage2";
function App() {
  return (
    <>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/chat" element={<ChatPage></ChatPage>}></Route>
          <Route
            path="/chat/:dm_id"
            element={<ChatDetail></ChatDetail>}
          ></Route>
          <Route
            path="/openvidu/:dm_id"
            element={<VideoPage></VideoPage>}
          ></Route>
          <Route
            path="/openvidu2/:dm_id"
            element={<VideoPage2></VideoPage2>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
