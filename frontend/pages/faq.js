import Layout from "../components/Layout";
import styles from "../components/faq/faq.module.css";
const FAQ = () => {
  const faqData = [
    {
      id: 1,
      question: "asd",
      answer: "123",
    },
    {
      id: 2,
      question: "asd",
      answer: "123",
    },
    {
      id: 3,
      question: "asd",
      answer: "123",
    },
    {
      id: 4,
      question: "asd",
      answer: "123",
    },
    {
      id: 5,
      question: "asd",
      answer: "123",
    },
  ];
  return (
    <>
      <Layout>
        <div className="grid grid-cols-12 gap-12 gap-y-24 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
          <div className="col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-12"></div>

          <div>
            {faqData.map((faq) => {
              return (
                <>
                  <div
                    className="text-lg font-medium py-4 bg-dark"
                    key={faq.id}
                  >
                    <h2 className={`text-lg font-medium py-4;`}>
                      {faq.question}
                    </h2>
                    <p className={`leading-6 py-2;`}>{faq.answer}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FAQ;
