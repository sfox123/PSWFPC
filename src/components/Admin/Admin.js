import AdminPanel from "./AdminPanel";
import AdminHeader from "./AdminHeader";
import { useGetPostsQuery } from "../../redux";

const Admin = () => {
  const { data: blogArray, isLoading: dataIsLoading } = useGetPostsQuery();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminHeader />
      <main className="flex-grow p-8 container mx-auto">
        <AdminPanel blogArray={blogArray} isLoading={dataIsLoading} />
      </main>
    </div>
  );
};

export default Admin;
