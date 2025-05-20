import { GroupsProvider } from "@/context/enterprise/GroupsEnterpriseContext";

export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GroupsProvider>{children}</GroupsProvider>;
}
