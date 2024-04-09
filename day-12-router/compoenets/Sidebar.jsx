import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>list of cityes</p>
      <Footer />
    </div>
  );
}
export default Sidebar;
