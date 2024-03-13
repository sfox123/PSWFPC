import { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Project from "./components/Project";
import NotFound from "./components/NotFound";

import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/Login";

import { collection, getDocs } from "firebase/firestore";

import { setIsAdmin } from "./redux";
import { db, storage, auth, authChanged } from "./api/firebase";
import "./style.css";

import NewPost from "./components/Admin/NewPost";

function Layout({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [dbValue, setDbValue] = useState([]); // [1]

  const blog = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const dataDB = collection(db, "blogs");

  useEffect(() => {
    const unsubscribe = authChanged(auth, (user) => {
      dispatch(setIsAdmin(!!user));
      setAuthChecked(true); // Update the authentication state
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const dataDB = collection(db, "blogs");
      const val = await getDocs(dataDB);
      setDbValue(val.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  if (!authChecked) {
    return <div>Loading authentication...</div>;
  }

  function RequireAuth({ children }) {
    const isAdmin = useSelector((state) => state.isAdmin);

    if (!isAdmin) {
      return <Navigate to="/login" replace />; // Redirect to login
    } else {
      return children;
    }
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Main blogs={blog} />
              </Layout>
            }
          />
          <Route
            path="/project/:id"
            element={
              <Layout>
                <Project />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/post"
            element={
              <Layout>
                <div>Post</div>
              </Layout>
            }
          />
          <Route
            path="/admin/panel"
            element={
              <RequireAuth>
                <Admin imgDB={storage} ref={db} db={dbValue} />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/blog/new"
            element={
              <RequireAuth>
                <NewPost db={dataDB} imgDB={storage} />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
