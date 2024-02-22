import AdminPanel from "./AdminPanel";
import { blogArray } from "../../api/constant";
import AdminHeader from "./AdminHeader";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminHeader />
      <main className="flex-grow p-8 container mx-auto">
        <AdminPanel blogArray={blogArray} />
      </main>
    </div>
  );
};

export default Admin;
