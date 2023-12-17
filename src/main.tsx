import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./app/store.ts";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Form from "./components/shared/form/Form.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Profile from "./components/profile/Profile.tsx";
import Home from "./components/home/Home.tsx";
import "react-toastify/dist/ReactToastify.css";
import Cards from "./components/cards/Cards.tsx";
import PagePack from "./components/cards/pack/PagePack.tsx";
import { persistor } from "./app/store.ts";
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Form formType="register" />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/cards/" element={<Cards />} />
        <Route path="pack/:id" element={<PagePack />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
       <RouterProvider router={router} />
    </PersistGate>
    {/* </React.StrictMode> */}
  </Provider>
);
