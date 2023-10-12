import Head from "next/head";
import { useEffect, useState } from "react";
import React from "react";
const PaymentLayout = ({ children }) => {
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://banquemisr.gateway.mastercard.com/static/checkout/checkout.min.js";
    script.async = true;
    script.dataset.error = "errorCallback";
    script.dataset.cancel = "http://localhost:3000/";
    script.onload = () => {
      const checkoutObject = window.Checkout;
      setCheckout(checkoutObject);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup when the component unmounts (optional)
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Head>{/* Other head elements */}</Head>

      {React.cloneElement(children, { checkout })}
    </div>
  );
};

export default PaymentLayout;
