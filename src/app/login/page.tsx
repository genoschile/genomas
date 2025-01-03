import FeaturesHeader from "@/components/FeaturesHeader";
import FormLogin from "@/components/FormLogin";

export default function page() {
  return (
    <>
      <FeaturesHeader />
      
      <div className="container mx-auto h-screen flex flex-col items-center justify-center max-w-xl">
        <img
          src="/images/genomas.png"
          className="w-full h-full object-contain"
          alt=""
        />

        <FormLogin />
      </div>
    </>
  );
}
