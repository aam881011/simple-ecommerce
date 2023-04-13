import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Home from "./component/Home/Home";
import Movies from "./component/Movies/Movies";
import People from "./component/People/People";
import Tv from "./component/Tv/Tv";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import { useState } from "react";
// import Item from "./component/Item/Item";
import NotFound from "./component/NotFound/NotFound";
import ItemDetails from "./component/ItemDetails/ItemDetails";
import Slider from "./component/Slider/Slider";

function App() {
  // const [userDate, setuserDate] = useState(null);

  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Register /> },
        {
          path: "home",
          element: (
            <>
              <Slider />
              <Home />
            </>
          ),
        },
        { path: "movies", element: <Movies /> },
        { path: "people", element: <People /> },
        { path: "tv", element: <Tv /> },
        { path: "login", element: <Login /> },
        { path: "details/:detailsId", element: <ItemDetails /> },
        { index: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={routers} />

      {/* <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="details/:detailsId" element={<ItemDetails />} />
          </Routes>
        </BrowserRouter>
      </> */}
    </div>
  );
}

// <Route path="" element={} />
// <Route path="" element={} />
export default App;
