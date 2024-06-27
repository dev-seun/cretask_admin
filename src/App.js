import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./Private";
import Home from "./site/home";
import ViewUser from "./site/ViewUser/ViewUser";
import { Toaster } from "react-hot-toast";
import TopUpRequest from "./site/TopUpRequest";
import Settings from "./site/Settings";

import WithdrawalRequest from "./site/WithdrawalRequest";
import LogOut from "./site/logout";
import Login from "./site/auth/login";

function App() {
  return (
    <>
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/topup" element={<TopUpRequest />} />
              <Route path="/user" element={<ViewUser />} />
              <Route path="/widthdraw" element={<WithdrawalRequest />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<LogOut />} />
              <Route
                path="*"
                element={
                  <p className="fs-1">
                    404 Error <br /> Not FOund
                  </p>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <p className="fs-1">
                  404 Error <br /> Not FOund
                </p>
              }
            ></Route>
          </Routes>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </BrowserRouter>
      {/* </Provider> */}
    </>
  );
}

export default App;
