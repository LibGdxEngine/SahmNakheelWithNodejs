import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import SearchUsersPage from "../../../components/crud/SearchUsersPage";

const SearchUsers = () => {
  return (
    <Layout>
      <Admin>
        <div className="w-full mt-4 flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <h2>البحث عن المستخدمين</h2>
          </div>
        </div>
        <div className="w-full ">
          <SearchUsersPage />
        </div>
      </Admin>
    </Layout>
  );
};

export default SearchUsers;
