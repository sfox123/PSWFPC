import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPostsQuery } from "./redux";

import Footer from "./components/Footer/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Project from "./components/Project";
import NotFound from "./components/NotFound";
import "./style.css";
import { useEffect } from "react";
import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/Login";

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
  const blog = useSelector((state) => state.post);
  const isAdmin = useSelector((state) => state.isAdmin);

  const { data, error, isLoading } = useGetPostsQuery();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <BrowserRouter>
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
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/post"
          element={
            <Layout>
              <div>Post</div>
            </Layout>
          }
        />
        <Route path="/admin" element={isAdmin ? <Admin /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
