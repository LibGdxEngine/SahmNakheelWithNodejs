import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { preSignup } from "../../../actions/auth";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ManWomanRadioGroup from "./ManWomanRadioGroup";

const SignupComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    gender: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const [countryCode, setCountryCode] = useState("");
  const selectRef = useRef(null);

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

  const {
    gender,
    name,
    email,
    phone,
    password,
    error,
    loading,
    message,
    showForm,
  } = values;

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const finalPhoneNumber = countryCode + phone;
    const user = {
      gender,
      name,
      email: email.toLowerCase(),
      password,
      phone: finalPhoneNumber,
    };

    preSignup(user).then((data) => {
      if (data.error) {
        toast.error(data.error);
        setValues({ ...values, error: data.error, loading: false });
      } else {
        router.push(`${data.signuplink}`);
        // toast.success(data.message, {
        //   autoClose: 5000,
        //   onClose: () => {
        //     router.push("/signin");
        //   },
        // });
        // setValues({
        //   ...values,
        //   name: "",
        //   email: "",
        //   password: "",
        //   phone: "",
        //   loading: false,
        //   message: data.message,
        //   showForm: false,
        // });
      }
    });
  };

  const handleDropdownChange = () => {
    setCountryCode(selectRef.current.value);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signupForm = () => {
    return (
      <>
        <div className="h-screen flex bg-white sm:m-0 mt-16 ml-8 mb-4 rounded-2xl ">
          <div
            style={{
              background:
                "linear-gradient(rgb(64, 104, 130),rgba(0,0,0,.2)),url(images/imageSignin.jpg) center center",
              backgroundSize: "cover",
            }}
            className="w-full 
          justify-around items-center lg:hidden rounded-2xl "
          >
            <div className="w-full mx-auto px-20 flex-col items-center justify-center space-y-6 mt-8">
              <div className="w-full h-full flex flex-col items-center justify-center ">
                <h1 className="text-white font-bold text-4xl">
                  فَانكِحُوا مَا طَابَ لَكُم مِّنَ النِّسَاءِ
                </h1>
                <p className="text-white mt-3">أربع زوجات خير من ثلاث</p>
              </div>

              <div className="w-full flex flex-col items-center justify-center lg:justify-start mt-6">
                <Link
                  href="/signin"
                  className=" hover:!text-third hover:-translate-y-1 transition-all duration-500 bg-white !text-primary mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                >
                  تسجيل الدخول
                </Link>
                <p className="text-white text-sm mt-1">
                  اضغط هنا اذا كان لديك حساب سابق بالفعل{" "}
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
                  قم بتسجيل حساب جديد حتى تستطيع التفاعل معنا
                </p>

                <ManWomanRadioGroup
                  onSelect={(selection) => {
                    setValues({ ...values, gender: selection });
                  }}
                />
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 64 64"
                  >
                    <circle cx={32} cy={18.14} r={11.14} />
                    <path d="M54.55 56.85A22.55 22.55 0 0 0 32 34.3 22.55 22.55 0 0 0 9.45 56.85Z" />
                  </svg>
                  <input
                    id="name"
                    className=" pl-2 w-full outline-none border-none"
                    type="text"
                    name="name"
                    onChange={handleChange("name")}
                    placeholder="الاسم باللغة العربية"
                  />
                </div>

                <div
                  dir="rtl"
                  className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl"
                >
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
                    id="email"
                    className=" pl-2 w-full outline-none border-none"
                    type="text"
                    name="email"
                    onChange={handleChange("email")}
                    dir="rtl"
                    placeholder="البريد الالكتروني"
                  />
                </div>

                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M19.308 12.467a24.095 24.095 0 0 1-.881-4.384C18.27 6.602 16.977 5.5 15.488 5.5H8.58c-1.777 0-3.145 1.535-2.989 3.304 1.575 17.829 15.777 32.03 33.606 33.606 1.77.156 3.304-1.207 3.304-2.984v-6.16c0-2.248-1.102-3.536-2.583-3.693a24.095 24.095 0 0 1-4.384-.88 4.903 4.903 0 0 0-4.87 1.243l-2.957 2.957a31.27 31.27 0 0 1-12.599-12.599l2.957-2.957a4.903 4.903 0 0 0 1.244-4.87Z"
                      style={{
                        fill: "currentColor",
                        stroke: "currentColor",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    />
                  </svg>

                  <input
                    id="phone"
                    className=" pl-2 w-full outline-none border-none"
                    type="phone"
                    name="phone"
                    onChange={handleChange("phone")}
                    placeholder="رقم الهاتف"
                  />
                  <select
                    ref={selectRef}
                    onChange={handleDropdownChange}
                    required={true}
                    value={countryCode}
                  >
                    <option value="" disabled={true} hidden={true}>
                      اختر بلدك
                    </option>
                    <option value="2">(20+) مصر</option>
                    <option value="212">(212+) المغرب</option>
                    <option value="213">(213+) الجزائر</option>
                    <option value="216">(216+) تونس</option>
                    <option value="218">(218+) ليبيا</option>
                    <option value="249">(249+) السودان</option>
                    <option value="961">(961+) لبنان</option>
                    <option value="962">(962+) الأردن</option>
                    <option value="963">(963+) سوريا</option>
                    <option value="964">(964+) العراق</option>
                    <option value="966">(966+) الجزيرة العربية</option>
                    <option value="967">(967+) اليمن</option>
                    <option value="970">(970+) فلسطين</option>
                    <option value="971">(971+) الإمارات</option>
                    <option value="965">(965+) الكويت</option>
                    <option value="973">(973+) البحرين</option>
                    <option value="974">(974+) قطر</option>
                    <option value="90">(+90) تركيا</option>
                  </select>
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
                    className="pl-2 w-full outline-none border-none"
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange("password")}
                    placeholder="كلمة السر"
                  />
                </div>

                <button
                  type="submit"
                  className="block w-full !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  تسجيل
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
                      router.push("/signin");
                    }}
                    className="text-sm ml-2 hover:text-fourth cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  >
                    تسجيل الدخول
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{showForm && signupForm()}</>;
};

export default SignupComponent;
