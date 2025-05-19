import { OrganizationContextProvider } from "@/context/OrganizationContext";
import { FormSignUp } from "./components/FormEnterpriseSignUp";

export default function page() {
  return (
    <OrganizationContextProvider>
      <FormSignUp />
    </OrganizationContextProvider>
  );
}
