import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";

import Link from "next/link";
import ProgressBar from "../../helpers/ProgressBar";
const AdminIndex = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (loadingStatus === "idle") {
  } else if (loadingStatus === "loading") {
  } else if (loadingStatus === "succeeded") {
  } else if (loadingStatus === "failed") {
  }

  return (
    <Layout>
      <Admin>
        {user ? (
          <div style={{ direction: "rtl" }} className="row">
            <div className="col-md-12 pt-5 pb-5 ps-5 pe-5">
              <h2>صفحة الإدارة</h2>
            </div>
            {user.role === 1 && (
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/need-contact"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      طلبات قبول تحتاج الى تواصل
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/search-users"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      البحث عن مستخدم
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/chats"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      مراقبة المحادثات
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/confirmations"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      طلبات التسجيل
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/confirmations-women"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      طلبات التسجيل - نساء
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/rejected-confirmation-requests"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      طلبات التسجيل المرفوضة
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/category-tag"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      ادارة الأقسام
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/category-tag"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      ادارة العناوين
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/blog"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      إنشاء مقالة
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/blogs"
                      className="block w-1/3 sm:w-full  sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      تعديل أو حذف المقالات
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/reports"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      البلاغات
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {user.role === 2 && (
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/chats"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      مراقبة المحادثات
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/search-users"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      البحث عن مستخدم
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {user.role === 3 && (
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/chats"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      مراقبة المحادثات
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/search-users"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      البحث عن مستخدم
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/admin/crud/need-contact"
                      className="block w-1/3 sm:w-full sm:p-4 text-center !bg-primary mt-5 py-2 rounded-2xl hover:!bg-fourth hover:!text-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    >
                      طلبات قبول تحتاج الى تواصل
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex felx-col items-center justify-center">
            <ProgressBar />
          </div>
        )}
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
