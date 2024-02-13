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
  const { data, error, isLoading } = useGetPostsQuery();

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
          path="/project"
          element={
            <Layout>
              <Project />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
