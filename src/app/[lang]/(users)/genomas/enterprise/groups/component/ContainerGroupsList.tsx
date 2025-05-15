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
