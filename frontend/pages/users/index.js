import Layout from "../../components/Layout";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import ManUserCard from "../../components/search/ManUserCard";
import classes from "../../components/search/ManUserCard.module.css";

import WomanUserCard from "../../components/search/WomanUserCard";
import Pagination from "../../components/search/Pagination";
import { useRouter } from "next/router";
import { COUNTRIES, STATES } from "../../constants";
import TransitionEffect from "../../components/TransitionEffect";
import { motion } from "framer-motion";
import Link from "next/link";
import { FilterIcon, ResetIcon } from "../../components/navbar/Icons";
import FiltrationModal from "../../helpers/FiltrationModal";
import RangeSlider from "../../helpers/RangeSlider";

const UsersPage = () => {
  let pageSize = 20;
  const router = useRouter();
  const { query } = router;
  const MotionLink = motion(Link);
  const [usersData, setUsersData] = useState({});

  const [filtrationModalIsOpen, setFiltrationModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setFiltrationModalIsOpen(true);
    setFilterBtnIsHovered(false);
  };

  const handleCloseModal = () => {
    setFiltrationModalIsOpen(false);
  };
  const [usersOnlineStatus, setUsersOnlineStatus] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [filterBtnIsHovered, setFilterBtnIsHovered] = useState(false);

  const showAllUsers = () => {
    return loadedUsers.map((user, i) => {
      return (
        <div
          key={i}
          className="col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-12"
        >
          {user.gender === "man" ? (
            <div>
              <ManUserCard
                user={user}
                isOnline={usersOnlineStatus[[`\"${user._id}\"`]].isOnline}
                lastSeen={
                  usersOnlineStatus[[`\"${user._id}\"`]].isOnline
                    ? ""
                    : usersOnlineStatus[[`\"${user._id}\"`]].lastSeen
                }
              />
            </div>
          ) : (
            <div>
              <WomanUserCard
                user={user}
                isOnline={usersOnlineStatus[[`\"${user._id}\"`]].isOnline}
                lastSeen={
                  usersOnlineStatus[[`\"${user._id}\"`]].isOnline
                    ? ""
                    : usersOnlineStatus[[`\"${user._id}\"`]].lastSeen
                }
              />
            </div>
          )}
        </div>
      );
    });
  };

  const [filterQuery, setFilterQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("woman");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedFace, setSelectedFace] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const handleGenderFilterClick = (genderValue) => {
    setSelectedGender(genderValue);
    // window.location.href = `/users?g=${genderValue}`;
    setFilterQuery("");
  };

  const handleSearchClick = (e) => {
    const { pathname, query } = router;
    // Get current URL and append new parameters
    const newQuery = { ...query, ...filterQuery };
    delete newQuery.p;

    const href = { pathname, query: newQuery };
    // Navigate to new URL
    router.push(href);
  };

  const fetchUsersData = async () => {
    let pageNumber = 1;
    let gender = "woman";
    let status = "";
    let country = "";
    let nationality = "";
    let state = "";
    let face = "";
    let age = "";
    const paramsList = router.asPath.split("?")[1];
    if (paramsList) {
      const filtersList = paramsList.split("&");
      filtersList.forEach((filter) => {
        const [key, value] = filter.split("=");
        if (key === "p") {
          pageNumber = value;
        } else if (key === "g") {
          gender = value;
        } else if (key === "s") {
          status = value;
        } else if (key === "c") {
          country = value;
        } else if (key === "n") {
          nationality = value;
        } else if (key === "t") {
          state = value;
        } else if (key === "l") {
          face = value;
        } else if (key === "a") {
          age = value;
        }
      });
    }

    return getUsers(
      pageNumber,
      pageSize,
      gender,
      status,
      country,
      nationality,
      state,
      face,
      age
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsersOnlineStatus(data.userOnlineStatus);
        setLoadedUsers(data.users);
        setUsersData(data);
        setCurrentPage(pageNumber);
      }
    });
  };

  useEffect(() => {
    fetchUsersData();
  }, [router.query]);

  useEffect(() => {
    let g = "woman";
    let s = "";
    let c = "";
    let n = "";
    let t = "";
    let l = "";
    let a = "";
    const paramsList = router.asPath.split("?")[1];

    if (paramsList) {
      const filtersList = paramsList.split("&");
      filtersList.forEach((filter) => {
        let [key, value] = filter.split("=");
        value = decodeURIComponent(value);
        if (key === "g") {
          g = value;
          setSelectedGender(value);
        } else if (key === "s") {
          s = value;
          setSelectedStatus(s);
        } else if (key === "c") {
          c = value;
          setSelectedCountry(c);
        } else if (key === "n") {
          n = value;
          setSelectedNationality(n);
        } else if (key === "t") {
          t = value;
          setSelectedState(t);
        } else if (key === "l") {
          l = value;
          setSelectedFace(l);
        } else if (key === "a") {
          a = value;
          setSelectedAge(a);
        }
      });
    }

    const filter = {};
    if (a) {
      filter.a = a;
    }
    if (l) {
      filter.l = l;
    }
    if (s) {
      filter.s = s;
    }
    if (c) {
      filter.c = c;
    }
    if (n) {
      filter.n = n;
    }
    if (t) {
      filter.t = t;
    }
    if (g) {
      filter.g = g;
    }
    setFilterQuery(filter);
  }, [router]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let parameter = null;
    if (name === "generalStatus") {
      parameter = "s";
      setSelectedStatus(value);
    } else if (name === "country") {
      parameter = "c";
      setSelectedCountry(value);
    } else if (name === "nationality") {
      parameter = "n";
      setSelectedNationality(value);
    } else if (name === "state") {
      parameter = "t";
      setSelectedState(value);
    } else if (name === "face") {
      parameter = "l";
      setSelectedFace(value);
    } else if (name === "age") {
      parameter = "a";
      setSelectedAge(value);
    }

    setFilterQuery((prevQuery) => {
      return { ...prevQuery, [parameter]: value };
    });
  };

  const resetFiltrations = () => {
    setSelectedCountry("");
    setSelectedGender("");
    setSelectedNationality("");
    setSelectedState("");
    setSelectedStatus("");
    setSelectedAge("");
    setSelectedFace("");
    setFilterQuery("");
    handleCloseModal();
    window.location.href = `${router.pathname}?g=${selectedGender}`;
  };

  const head = () => {
    const title = `للزواج الإسلامي | ${APP_NAME}`;
    return (
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="هذه الصفحة للبحث عن الزواج الشرعي الإسلامي زوجات منتقبات نساء للزواج رجل مسلم للزواج"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`تزوج لتسكن | ${APP_NAME}`} />
        <meta
          name="og:description"
          content="الزواج سنة النبي صلى الله عليه وسلم"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta
          property="og:image"
          content={`${DOMAIN}/images/website_logo.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/static/images/datasci.jpg`}
        />
        <meta property="og:image:type" content={`image/jpg`} />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  if (!loadedUsers) {
    return (
      <>
        <TransitionEffect />
        <div className="w-full h-96 flex items-center justify-center">
          <h3>جاري التحميل ...</h3>
        </div>
      </>
    );
  }

  return (
    <>
      {head()}

      <FiltrationModal
        isOpen={filtrationModalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSearchClick}
      >
        <div className="flex flex-row items-center justify-between">
          <h1 dir="rtl" className="text-xl font-bold mb-4">
            تصفية نتائج البحث
          </h1>
          <div
            onClick={resetFiltrations}
            style={{ cursor: "pointer" }}
            className="flex flex-row items-center justify-center mb-4"
          >
            إلغاء التصفيات
            <ResetIcon className={`mx-2`} />
          </div>
        </div>

        <div
          dir="rtl"
          className="w-full grid grid-cols-3 gap-6 mb-6 md:grid-cols-2 sm:grid-cols-1"
        >
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              الحالة الاجتماعية
            </label>
            <select
              name="generalStatus"
              defaultValue={`${query.s ? query.s : ""}`}
              onChange={handleInputChange}
              className="block w-full py-2 px-3 border border-gray-300 !bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:!ring-fourth sm:text-sm"
            >
              <option value="" disabled hidden className="!text-primary">
                اختر الحالة الاجتماعية
              </option>
              {selectedGender === "man" ? (
                <>
                  <option
                    value={"متزوج"}
                    className="py-2 hover:bg-indigo-500 hover:text-white text-sm font-medium text-gray-700"
                  >
                    متزوج
                  </option>
                  <option
                    value={"أرمل"}
                    className="py-2 hover:bg-indigo-500 hover:text-white text-sm font-medium text-gray-700"
                  >
                    أرمل
                  </option>
                  <option
                    value={"أعزب"}
                    className="py-2 hover:bg-indigo-500 hover:text-white text-sm font-medium text-gray-700"
                  >
                    أعزب
                  </option>
                  <option
                    value={"مطلق"}
                    className="py-2 hover:bg-indigo-500 hover:text-white text-sm font-medium text-gray-700"
                  >
                    مطلق
                  </option>
                </>
              ) : (
                <>
                  <option
                    value={"أرملة"}
                    className="py-2 hover:bg-indigo-500 hover:text-white text-sm font-medium text-gray-700"
                  >
                    أرملة
                  </option>
                  <option
                    value={"عزباء"}
                    className="py-2 hover:bg-indigo-500 hover:text-white text-sm font-medium text-gray-700"
                  >
                    عزباء
                  </option>
                  <option
                    value={"مطلقة"}
                    className="py-2 hover:bg-indigo-500 hover:text-white text-sm font-medium text-gray-700"
                  >
                    مطلقة
                  </option>
                </>
              )}
            </select>
          </div>
          <div>
            <label
              htmlFor="nationality"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              الجنسية
            </label>
            <select
              defaultValue={`${query.n ? query.n : ""}`}
              onChange={handleInputChange}
              name="nationality"
              className="block w-full py-2 px-3 border border-gray-300 !bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:!ring-fourth sm:text-sm"
            >
              <option value="" disabled hidden className="!text-primary">
                اختر الجنسية
              </option>
              {COUNTRIES.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              بلد الإقامة
            </label>
            <select
              onChange={handleInputChange}
              defaultValue={`${query.c ? query.c : ""}`}
              name="country"
              className="block w-full py-2 px-3 border border-gray-300 !bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:!ring-fourth sm:text-sm"
            >
              <option value="" disabled hidden className="!text-primary">
                اختر بلد الإقامة
              </option>
              {COUNTRIES.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              المحافظة
            </label>
            <select
              name="state"
              defaultValue={`${query.t ? query.t : ""}`}
              onChange={handleInputChange}
              disabled={
                selectedCountry === "الإقامة" || selectedCountry === ""
                  ? true
                  : false
              }
              className="block w-full py-2 px-3 border border-gray-300 !bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:!ring-fourth sm:text-sm"
              required={true}
            >
              <option value="" disabled hidden className="!text-primary">
                اختر المحافظة
              </option>

              {selectedCountry !== "الإقامة" && selectedCountry !== ""
                ? STATES[selectedCountry.replace("+", " ")].map((state) => {
                    return (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    );
                  })
                : ""}
            </select>
          </div>
          <div>
            <label
              htmlFor="face"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {selectedGender === "man" ? (
                <span>شكل الوجه</span>
              ) : (
                <span>نوع الملابس</span>
              )}
            </label>
            <select
              onChange={handleInputChange}
              defaultValue={``}
              name="face"
              className="block w-full py-2 px-3 border border-gray-300 !bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:!ring-fourth sm:text-sm"
            >
              <option value="" disabled hidden className="!text-primary">
                {selectedGender === "man"
                  ? " اختر شكل الوجه"
                  : " اختر نوع الملابس"}
              </option>
              {selectedGender === "man" ? (
                <>
                  <option value="ملتحي" className="!text-primary">
                    رجل ملتحي (اقتداءا بالنبي صلى الله عليه وسلم)
                  </option>
                  <option value="لحية خفيفة" className="!text-primary">
                    لحية خفيفة (اقتداءا بالموضة)
                  </option>
                  <option value="أملس" className="!text-primary">
                    أملس (ناعم)
                  </option>
                </>
              ) : (
                <>
                  <option value="منتقبة سواد" className="!text-primary">
                    منتقبة سواد
                  </option>
                  <option value="منتقبة نقاب ملون" className="!text-primary">
                    منتقبة نقاب ملون
                  </option>
                  <option value="مختمرة" className="!text-primary">
                    مختمرة
                  </option>
                  <option
                    disabled={true}
                    value="طرح وفساتين"
                    className="!text-primary"
                  >
                    طرح وفساتين
                  </option>
                  <option
                    disabled={true}
                    value="طرح وبناطيل"
                    className="!text-primary"
                  >
                    طرح وبناطيل
                  </option>
                </>
              )}
            </select>
          </div>
          <div>
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              العمر
            </label>
            <RangeSlider
              onChange={(rangeAsString) => {
                let parameter = "a";
                if (typeof rangeAsString === "string") {
                  setFilterQuery((prevQuery) => {
                    return { ...prevQuery, [parameter]: rangeAsString };
                  });
                }
              }}
            />
          </div>
        </div>
      </FiltrationModal>
      <Layout>
        <div className="row-md-12">
          <div className={`flex flex-col items-center justify-center`}>
            <div className="flex flex-col items-center justify-center">
              <motion.a
                style={{ cursor: "pointer" }}
                onClick={handleOpenModal}
                whileHover={{ y: -2 }}
                onHoverStart={() => {
                  setFilterBtnIsHovered(true);
                }}
                onHoverEnd={() => {
                  setFilterBtnIsHovered(false);
                }}
                className={`w-auto flex items-center bg-white mx-2 !text-primary p-2.5 px-6 !border-primary
                rounded-lg text-lg font-semibold hover:!bg-primary hover:!border-white hover:!text-white
                border-2 border-solid border-transparent 
                dark:bg-white dark:text-dark hover:dark:bg-dark hover:dark:text-white
                hover:dark:border-white md:p-2 md:px-4 md:text-base sm:mt-4
                `}
              >
                تصفية البحث
                <FilterIcon
                  stroke={`${filterBtnIsHovered ? "#fff" : "#406882"}`}
                />
              </motion.a>
            </div>

            <div className={classes.container}>
              <div className={classes.gender}>
                <MotionLink
                  href={`/users?g=woman`}
                  onClick={() => {
                    handleGenderFilterClick("woman");
                  }}
                  className={
                    selectedGender === "woman"
                      ? `flex items-center !bg-primary mx-2 text-white p-2.5 px-6
                      rounded-lg text-lg font-semibold hover:bg-white hover:text-dark
                      border-2 border-solid border-transparent hover:border-dark
                      dark:bg-white dark:text-dark hover:dark:bg-dark hover:dark:text-white
                      hover:dark:border-white md:p-2 md:px-4 md:text-base
                      `
                      : `flex items-center !bg-fourth mx-2 text-white p-2.5 px-6
                      rounded-lg text-lg font-semibold hover:bg-white hover:text-dark
                      border-2 border-solid border-transparent hover:border-dark
                      dark:bg-white dark:text-dark hover:dark:bg-dark hover:dark:text-white
                      hover:dark:border-white md:p-2 md:px-4 md:text-base
                      `
                  }
                >
                  نساء
                </MotionLink>
                <MotionLink
                  href={`/users?g=man`}
                  onClick={() => {
                    handleGenderFilterClick("man");
                  }}
                  className={
                    selectedGender === "man"
                      ? `flex items-center !bg-primary mx-2 text-white p-2.5 px-6
                      rounded-lg text-lg font-semibold hover:bg-white hover:text-dark
                      border-2 border-solid border-transparent hover:border-dark
                      dark:bg-white dark:text-dark hover:dark:bg-dark hover:dark:text-white
                      hover:dark:border-white md:p-2 md:px-4 md:text-base
                      `
                      : `flex items-center !bg-fourth mx-2 text-white p-2.5 px-6
                      rounded-lg text-lg font-semibold hover:bg-white hover:text-dark
                      border-2 border-solid border-transparent hover:border-dark
                      dark:bg-white dark:text-dark hover:dark:bg-dark hover:dark:text-white
                      hover:dark:border-white md:p-2 md:px-4 md:text-base
                      `
                  }
                >
                  رجال
                </MotionLink>
              </div>
              <div
                className={`w-full h-full inline-block p-32 dark:bg-dark xl:p-24 lg:p-16 md:p-12 sm:p-8 pt-16 mb-16`}
              >
                {loadedUsers.length === 0 && (
                  <>
                    <div
                      style={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>لا توجد نتائج لهذا البحث</p>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-12 gap-12 gap-y-24 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
                  {loadedUsers && showAllUsers()}
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <br />
          </div>
          <div className={classes["pagination"]}>
            <Pagination
              currentPage={currentPage}
              totalPages={usersData.size / pageSize}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UsersPage;
