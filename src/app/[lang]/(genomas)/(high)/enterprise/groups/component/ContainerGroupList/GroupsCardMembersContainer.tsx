export const GroupsCardMembersContainer = ({
  title = "Miembros",
  children,
  currentQuantityMembers,
}: {
  title?: string;
  children: React.ReactNode;
  currentQuantityMembers?: number;
}) => {
  return (
    <article className="groupsCardMembers">
      <p>
        {title} <span>({currentQuantityMembers})</span>
      </p>
      {children}
    </article>
  );
};
