import FeaturesHeader from "@/components/FeaturesHeader";
import FormLogin from "@/components/FormLogin";
import "./page.css"
export default function page() {
  return (
    <>
      <FeaturesHeader />
      <div className="login__container">
      <FormLogin />
      </div>
    </>
  );
}
