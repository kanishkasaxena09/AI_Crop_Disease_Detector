import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Shuruat mein gayab aur thoda neeche
      animate={{ opacity: 1, y: 0 }}   // Aate waqt saaf aur apni jagah par
      exit={{ opacity: 0, y: -20 }}    // Jaate waqt gayab aur thoda upar
      transition={{ duration: 0.5, ease: "easeOut" }} // 0.5 second ki smoothness
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;