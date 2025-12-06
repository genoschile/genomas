/* icons */
import { IoMdArrowRoundUp } from "react-icons/io";

/* style */
import "./scrollToTopButton.css"

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
      <IoMdArrowRoundUp size={24} color="white"/>
    </button>
  );
};

export default ScrollToTopButton;
