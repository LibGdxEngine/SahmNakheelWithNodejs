import { motion } from "framer-motion";

const Heart = ({ x, y }) => {
  // const emojis = ["🧡", "🧡", "❤️", "💙", "🖤", "💜"];
  const emojis = ["❤️"]
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const randomElement = emojis[randomIndex];
  return (
    <motion.div
      style={{
        position: "absolute",
        top: y,
        left: x,
        zIndex: "-1",
        fontSize: "50px",
        color: "red",
      }}
      animate={{ y: "-50vh", opacity: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {randomElement}
    </motion.div>
  );
};

export default Heart;
