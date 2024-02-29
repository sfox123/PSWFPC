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

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

import { setIsAdmin } from "./redux";

import "./style.css";

import NewPost from "./components/Admin/NewPost";

const firebaseConfig = {
  apiKey: "AIzaSyBPzZ_3RT0K1R9sdPI51y2ygV5QE7THMrU",
  authDomain: "pswfpc-a086d.firebaseapp.com",
  projectId: "pswfpc-a086d",
  storageBucket: "pswfpc-a086d.appspot.com",
  messagingSenderId: "304737532037",
  appId: "1:304737532037:web:061fbb509f5fda482891ec",
  measurementId: "G-4LYLLK6X33",
};

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

  const blog = useSelector((state) => state.post);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const imgDB = getStorage(app);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setIsAdmin(!!user));
      setAuthChecked(true); // Update the authentication state
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, [dispatch]);

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
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/blog/new"
            element={
              <RequireAuth>
                <NewPost imgDB={imgDB} />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
