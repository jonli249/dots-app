import { useState } from "react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className=" relative"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 sm:w-[116.576px] flex items-center justify-center gap-2 sm:gap-5 rounded-[5px] h-[47px] text-black font-inter text-[15px] font-normal bg-[#EAEAEA]"
      >
        Filter
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.10876 5.79211L6.09789 9.03034L9.08703 5.79211"
              stroke="#101828"
              stroke-width="1.05615"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="bg-[#999] absolute mt-2 shadow-2xl w-[116px] p-2 flex flex-col gap-1"
      >
        <motion.li
          variants={itemVariants}
          className="bg-white rounded-[4px] flex justify-center shadow-md"
        >
          Filter 1{" "}
        </motion.li>
        <motion.li
          variants={itemVariants}
          className="bg-white rounded-[4px] flex justify-center shadow-md"
        >
          Filter 2{" "}
        </motion.li>
        <motion.li
          variants={itemVariants}
          className="bg-white rounded-[4px] flex justify-center shadow-md"
        >
          Filter 3{" "}
        </motion.li>
        <motion.li
          variants={itemVariants}
          className="bg-white rounded-[4px] flex justify-center shadow-md"
        >
          Filter 4{" "}
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
}
