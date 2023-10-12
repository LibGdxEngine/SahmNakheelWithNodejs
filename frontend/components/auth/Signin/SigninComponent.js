import { useRouter } from "next/router";
import { useState } from "react";
import { signin, authenticate } from "../../../actions/auth";
import Link from "next/link";

import classes from "./Signin.module.css";
import { getProfile } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../../redux/userSlice";
import { toast } from "react-toastify";

const SigninComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const dispatch = useDispatch();

  const loadingStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (loadingStatus === "loading") {
  } else if (loadingStatus === "succeeded") {
  } else if (loadingStatus === "failed") {
  }

  if (isAuthenticated && typeof window !== "undefined") {
    if (user.role === 1) {
      router.replace("/admin");
    } else {
      router.replace("/user");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email: email.toLowerCase(), password };
    signin(user).then(async (data) => {
      if (data.error) {
        toast.error(data.error);
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to local storage
        // authenticate user
        const token = data.token;
        setValues({ ...values, error: "", loading: false });
        authenticate(data, async () => {
          const data = await getProfile(token);
          const user = data;
          // Dispatch the signIn action with the user data
          dispatch(LoginUser(token));
          if (user.role === 1) {
            router.replace("/admin");
          } else {
            router.replace("/user");
          }
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const { email, password, error, loading, message, showForm } = values;

  const showLoading = () =>
    loading ? (
      <div className="alert alert-info" role="alert">
        <div className="text-center">برجاء الانتظار</div>
      </div>
    ) : (
      ""
    );
  const showError = () =>
    error ? (
      <div className="alert alert-danger" role="alert">
        <div className="text-center">{error}</div>
      </div>
    ) : (
      ""
    );
  const showMessage = () =>
    message ? (
      <div className="alert alert-info" role="alert">
        <div className="text-center">{message}</div>
      </div>
    ) : (
      ""
    );

  const newSigninForm = () => {
    return (
      <>
        <div className={classes.container}>
          <form className={classes["form-container"]} onSubmit={handleSubmit}>
            <h1 className={classes.title}>تسجيل الدخول</h1>
            <div className={`${classes["input-container"]}`}>
              <label className={`${classes["input-label"]}`}>
                *بريدك الالكتروني
              </label>
              <input
                type="email"
                onChange={handleChange("email")}
                className={`${classes["input"]}`}
                value={email}
                required
              />
            </div>
            <div className={`${classes["input-container"]}`}>
              <label className={`${classes["input-label"]}`}>*كلمة السر</label>
              <input
                onChange={handleChange("password")}
                type="password"
                value={password}
                className={`${classes["input"]}`}
                required
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button className={`${classes["submit"]}`}>تسجيل الدخول</button>
            </div>
            <Link href={`/auth/password/forgot`}>
              <p
                style={{
                  marginTop: "4rem",
                  textAlign: "center",
                  color: "#A7727D",
                  textDecoration: "underline",
                }}
                className={`${classes["input-label"]}`}
              >
                يمكنك استعادة كلمة السر من هنا
              </p>
            </Link>
          </form>
          <div className={`${classes["image"]}`}>
            <img src="/images/muslim.png" alt="لتسكنوا" />
          </div>
        </div>
      </>
    );
  };

  const signinForm = () => {
    return (
      <>
        <div className="h-screen flex bg-white sm:m-0 mt-8 ml-8 mb-4 rounded-2xl">
          <div
            style={{
              background:
                "linear-gradient(rgb(64, 104, 130),rgba(0,0,0,.2)),url(images/imageSignin2.jpg) center center",
              backgroundSize: "cover",
            }}
            className="w-full 
          justify-around items-center lg:hidden rounded-2xl"
          >
            <div className="w-full mx-auto px-20 flex-col items-center justify-center space-y-6 mt-8">
              <div className="w-full h-full flex flex-col items-center justify-center ">
                <h1 className="text-white font-bold text-4xl">
                  فَانكِحُوا مَا طَابَ لَكُم مِّنَ النِّسَاءِ
                </h1>
                <p className="text-white mt-3">ثلاث زوجات خير من واحدة</p>
              </div>

              <div className="w-full flex flex-col items-center justify-center lg:justify-start mt-6">
                <Link
                  href="/signup"
                  className=" hover:!text-third hover:-translate-y-1 transition-all duration-500 bg-white text-primary mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                >
                  سجل حسابك
                </Link>
                <p className="text-white text-sm mt-1">
                  اضغط هنا اذا لم يكن لديك حساب{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-full justify-center items-center bg-white space-y-8">
            <div className="w-full px-8 md:px-8 lg:px-24 sm:px-0">
              <form
                onSubmit={handleSubmit}
                dir="rtl"
                className="bg-white rounded-md shadow-2xl p-5"
              >
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                  أهلا بك
                </h1>
                <p className="text-sm font-normal text-gray-600 mb-8">
                  قم بتسجيل الدخول إلى حسابك
                </p>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    onChange={handleChange("email")}
                    id="email"
                    className=" pl-2 w-full outline-none border-none"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="البريد الالكتروني"
                  />
                </div>
                <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    onChange={handleChange("password")}
                    className="pl-2 w-full outline-none border-none"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="كلمة السر"
                  />
                </div>
                <button
                  type="submit"
                  className="block w-full !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  تسجيل الدخول
                </button>
                <div className="flex justify-between mt-4">
                  <span
                    onClick={() => {
                      router.push("/auth/password/forgot");
                    }}
                    className="text-sm ml-2 hover:text-fourth cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  >
                    نسيت كلمة السر؟
                  </span>

                  <div
                    onClick={() => {
                      router.push("/signup");
                    }}
                    className="text-sm ml-2 hover:text-fourth cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  >
                    حساب جديد
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showForm && signinForm()}
      {/* {showError()}
      {showLoading()}
      {showMessage()} */}
    </>
  );
};

export default SigninComponent;
