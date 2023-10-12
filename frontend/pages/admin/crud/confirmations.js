import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import ConfirmationsListForMen from "../../../components/crud/ConfirmationsListForMen";

const Confirmations = () => {
  return (
    <Layout>
      <Admin>
        <div className="row m-2">
          <div className="flex flex-col items-center justify-center">
            <h2>ادارة طلبات التسجيل</h2>
          </div>
          <div className="col-md-12">
            <ConfirmationsListForMen />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Confirmations;
