import { GroupsCard } from "./ContainerGroupList/GroupsCard";

export const containerGroupsListItem = [
  "owl",
  "dog",
  "cat",
  "birth",
  "dog",
  "cat",
  "birth",
  "dog",
];

const getGroupsList = async () => {
  const organizationId = localStorage.getItem("organizationId");

  if (!organizationId) {
    throw new Error("No organization ID found in localStorage");
  }

  const res = await fetch(`/api/organization/${organizationId}/groups`);
  return await res.json();
};

export const ContainerGroupsList = () => {
  return (
    <div className="containerGroupsList">
      <ul>
        {containerGroupsListItem.map((item, index) => {
          return <GroupsCard key={index} item={`${item}`} />;
        })}
      </ul>
    </div>
  );
};
