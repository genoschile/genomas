import FeaturesHeader from "@/components/FeaturesHeader";
import FormLogin from "@/components/FormLogin";

export default function page() {
  return (
    <>
      <FeaturesHeader />
      <div className="h-screen grid place-content-center">
      <FormLogin />
      </div>
    </>
  );
}
