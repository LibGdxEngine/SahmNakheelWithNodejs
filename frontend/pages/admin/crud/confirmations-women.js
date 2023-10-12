import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import ConfirmationsListForWomen from "../../../components/crud/ConfirmationsListForWomen";

const ConfirmationsWomen = () => {
  return (
    <Layout>
      <Admin>
        <div className="row m-2">
          <div className="flex flex-col items-center justify-center">
            <h2>ادارة طلبات التسجيل</h2>
          </div>
          <div className="col-md-12">
            <ConfirmationsListForWomen />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default ConfirmationsWomen;
