import "./layout.css";
import "./style.css";
import { FooterLanding } from "@/features/landing/components/FooterLanding";
import HeaderLanding from "@/features/landing/components/HeaderLanding";
// import { ViewTransition } from "react";
import { ExampleFormClinical } from "../(genomas)/user/components/utilsForm/stepUploads/components/ExampleFormClinical";

export default function landingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLanding />
      {/* <ViewTransition name="page"> */}
        <div
          style={{
            minBlockSize: "100vh",
          }}
        >
          <main className="pipelines-guides">
            <div
              className=""
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h2 className="upload-files__title">
                Upload your VCF file and/or Clinical data (optional)
              </h2>
              <ExampleFormClinical />
            </div>
            {children}
          </main>
        </div>
      {/* </ViewTransition> */}
      <FooterLanding />
    </>
  );
}
