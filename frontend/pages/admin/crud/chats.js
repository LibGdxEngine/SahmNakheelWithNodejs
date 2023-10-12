import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import ReadChats from "../../../components/crud/ReadChats";

const Chats = () => {
  return (
    <Layout>
      <Admin>
        <div className="w-full mt-4 flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <h2>ادارة المحادثات</h2>
          </div>
        </div>
        <div className="w-full ">
          <ReadChats />
        </div>
      </Admin>
    </Layout>
  );
};

export default Chats;
