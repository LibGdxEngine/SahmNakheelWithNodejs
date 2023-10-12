import { useState } from "react";
import { emailContactForm } from "../../actions/form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ContactForm = ({ authorEmail }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "أرسل الرسالة",
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "جاري الإرسال..." });
    if (values.message.split(" ").length < 10) {
      toast.error("رسالتك قصيرة للغاية");
      return;
    }
    emailContactForm({ authorEmail, name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        س;
      } else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "تم إرسال الرسالة",
          success: data.success,
        });
        toast.success("تم إرسال رسالتك بنجاح وسيتم الرد عليك في أسرع وقت", {
          onClose: () => {
            router.push("/");
          },
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "إرسال الرسالة",
    });
  };

  const showSuccessMessage = () =>
    success && <div className="alert alert-info">شكرا لك على مراسلتنا</div>;

  const showErrorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const contactForm = () => {
    return (
      <form onSubmit={clickSubmit} className="pb-5">
        <div className="form-group">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="message"
          >
            رسالتك
          </label>
          <textarea
            onChange={handleChange("message")}
            id="message"
            name="message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={message}
            required
            rows="10"
          ></textarea>
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            اسمك
          </label>
          <input
            type="text"
            onChange={handleChange("name")}
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            البريد الالكتروني
          </label>
          <input
            type="email"
            onChange={handleChange("email")}
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            required
          />
        </div>

        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
            {buttonText}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="m-4">
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </div>
  );
};

export default ContactForm;
