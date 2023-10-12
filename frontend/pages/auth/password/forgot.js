import Layout from "../../../components/Layout";
import TransitionEffect from "../../../components/TransitionEffect";
import ForgotPasswordForm from "../../../components/auth/ForgetPassword/ForgetPasswordForm";

const ForgotPassword = () => {
  return (
    <>
    <TransitionEffect />
      <Layout>
        <ForgotPasswordForm />
      </Layout>
    </>
  );
};

export default ForgotPassword;
