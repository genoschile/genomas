import "./layout.css";
import "./style.css";
import { FooterLanding } from "@/components/footer/FooterLanding";
import HeaderLanding from "@/components/headers/HeaderLanding";
import { unstable_ViewTransition as ViewTransition } from "react";
import { ExampleFormClinical } from "../(genomas)/user/upload-files/components/ExampleFormClinical";

export default function landingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLanding />
      <ViewTransition name="page">
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
      </ViewTransition>
      <FooterLanding />
    </>
  );
}
