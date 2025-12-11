import { IconRoundedFull } from "@/features/enterprise/components/enterprise/iconRoundedFull/IconRoundedFull";
import { FaUser } from "react-icons/fa";

export const GroupsCardMembersImg = ({
  userId,
  userName,
}: {
  userId: string;
  userName?: string;
}) => {
  const initial = userName?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="avatar-circle">
      <span>{initial}</span>
    </div>
  );
};
