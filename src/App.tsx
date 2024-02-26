import { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AppHeader from "./shared/AppHeader";
import { Toaster } from "./ui/toast/Toaster";

const AllForms = lazy(() => import("./pages/AllForms"));
const Create = lazy(() => import("./pages/Create"));
const Edit = lazy(() => import("./pages/Edit"));
const ViewForm = lazy(() => import("./pages/ViewForm"));

const PageLoaderUI = () => {
  return (
    <div className=" flex  h-screen items-center justify-center text-violet-700">
      Loading...
    </div>
  );
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/forms/all"} />} />
      <Route
        path="/forms/*"
        element={
          <div className=" flex  flex-col min-h-screen w-full bg-slate-100">
            <AppHeader />
            <Outlet />
            <Toaster />
          </div>
        }
      >
        <Route
          index
          path="all"
          element={
            <Suspense fallback={<PageLoaderUI />}>
              <AllForms />
            </Suspense>
          }
        />
        <Route
          path="preview/:formId"
          element={
            <Suspense fallback={<PageLoaderUI />}>
              <ViewForm />
            </Suspense>
          }
        />
        <Route
          path="create"
          element={
            <Suspense fallback={<PageLoaderUI />}>
              <Create />
            </Suspense>
          }
        />
        <Route
          path="update/:formId"
          element={
            <Suspense fallback={<PageLoaderUI />}>
              <Edit />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
