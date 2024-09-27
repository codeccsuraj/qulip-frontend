import { Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout"; // Ensure the correct extension is used
import { Homepage } from "../pages";
import RequiresAuth from "./RequiresAuth";
import { authContents, authRoutes } from "./contentRoutes";

const Index = () => {
  return (
    <Routes>
      <Route element={<SharedLayout />}>
        <Route element={<RequiresAuth />}>
          <Route path="/" element={<Homepage />} index />
          {authContents.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))};
        </Route>
        {authRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))};
      </Route>
    </Routes>
  );
};

export { Index };
