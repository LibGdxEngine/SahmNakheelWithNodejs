import React, { useState } from "react";
import Modal from "react-modal";
import classes from "./Chat.module.css";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const RejectionModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  reasons = null,
}) => {
  if (!reasons || reasons == null) {
    reasons = [
      { id: 0, text: "استخرت الله ولم أجد نفسي مرتاحا للأمر" },
      { id: 1, text: "اسلوب الكلام لم يعجبني" },
      { id: 2, text: "الطرف الأخر لا يرد على أسئلتي" },
      { id: 3, text: "المسافات بعيدة بيننا" },
      { id: 4, text: "مستوى التدين غير مناسب لي" },
      { id: 5, text: "ليس هناك توافق في الأفكار" },
    ];
  }

  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  const handleSelectQuestion = (questionId, isSelected) => {
    if (isSelected) {
      if (selectedQuestionIds.length < 1) {
        setSelectedQuestionIds([...selectedQuestionIds, questionId]);
      } else {
        toast.warning("يمكنك اختيار سبب واحد فقط");
      }
    } else {
      setSelectedQuestionIds(
        selectedQuestionIds.filter((id) => id !== questionId)
      );
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
      width: "auto", // Set the width to auto
      height: "auto", // Set the height to auto
      maxWidth: "80vw", // Set a maximum width to prevent overflowing the screen
      maxHeight: "80vh", // Set a maximum height to prevent overflowing the screen
    },
  };

  const handleSubmit = () => {
    console.log(reasons);

    onSubmit(reasons[selectedQuestionIds].text);
    setSelectedQuestionIds([]);
  };

  return (
    <Modal
      className={classes["questions-modal"]}
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
    >
      <h2 className={classes["questionsModalTitle"]}>
        ما هو سبب رفضك للاستمرار ؟
      </h2>
      <h2 className={classes["questionsModalHint"]}>
        لا تبخل علينا بالسبب الحقيقي
      </h2>
      <div className={classes["questionsContainer"]}>
        <div className={classes["questionsListContainer"]}>
          <ul>
            {reasons.map((reason) => (
              <div key={reason.id}>
                <input
                  type="checkbox"
                  id={`question${reason.id}`}
                  className={classes["question-checkbox"]}
                  checked={selectedQuestionIds.includes(reason.id)}
                  onChange={(e) => {
                    handleSelectQuestion(reason.id, e.target.checked);
                  }}
                />
                <label
                  htmlFor={`question${reason.id}`}
                  className={`${classes["question-chip"]} ${
                    selectedQuestionIds.includes(reason.id)
                      ? classes["selected"]
                      : ""
                  }`}
                >
                  {reason.text}
                </label>
              </div>
            ))}
          </ul>
        </div>
        <div className={classes["questionsActionsContainer"]}>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "20vw" }}
            onClick={onRequestClose}
            className="w-1/2 !bg-white p-2 !text-primary mx-3 rounded-lg border !border-primary"
          >
            الغاء
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "20vw" }}
            onClick={handleSubmit}
            className="w-1/2 !bg-white p-2 !text-primary mx-3 rounded-lg border !border-primary"
          >
            ارسال
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectionModal;
