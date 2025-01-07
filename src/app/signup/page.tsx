import FeaturesHeader from "@/components/FeaturesHeader";
import FormSignUp from "@/components/FormSignUp";

export default function page() {
  return (
    <>
      <FeaturesHeader />
      <div className="h-screen grid place-content-center">
      <FormSignUp />
      </div>
    </>
  );
}
