import { userPublicProfile } from "../../actions/user";
import Layout from "../../components/Layout";
import { isAuth } from "../../actions/auth";
import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";
import Link from "next/link";
import TransitionEffect from "../../components/TransitionEffect";
const UserProfileUpdate = () => {
  return (
    <Layout>
      <TransitionEffect/>
      <Private>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center g-2">
            <div className="col-md-12">
              <ProfileUpdate />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
