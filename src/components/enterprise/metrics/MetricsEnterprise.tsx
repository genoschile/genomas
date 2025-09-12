"use client";

import { JSX } from "react";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";
import { FaChartLine, FaUser, FaUsers } from "react-icons/fa";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";
import { SkeletonWorkspace } from "@/app/[lang]/(genomas)/(high)/enterprise/components/workspaces/components/ContainerListWorkspaces";
import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";

type Props = {
  title: string;
  icon: JSX.Element;
  value: string;
  change?: string;
  caption: string;
};

export const MetricCard = ({ title, icon, value, change }: Props) => {
  return (
    <div className="box box-metrics">
      <header>
        <h1>{title}</h1>
        <IconRoundedFull icon={icon} />
      </header>

      <main>
        <strong>{value}</strong>
        <small>
          <mark>{change}</mark>
        </small>
      </main>
    </div>
  );
};

export const TotalUsersCard = () => {
  const { users, loading } = useDataTableUserEnterpriseContext();

  if (loading) {
    return (
      <ul>
        {[...Array(1)].map((_, i) => (
          <SkeletonWorkspace key={i} />
        ))}
      </ul>
    );
  }

  return (
    <MetricCard
      title="Total Users"
      icon={<FaUser />}
      value={users.length.toString()}
      change="+ 12% from last month"
      caption="Usuarios activos"
    />
  );
};

export const TotalGroupsCard = () => {
  const { groups, loading } = useGroupsContext();

  if (loading) {
    return (
      <ul>
        {[...Array(1)].map((_, i) => (
          <SkeletonWorkspace key={i} />
        ))}
      </ul>
    );
  }

  return (
    <MetricCard
      title="Total Groups"
      icon={<FaUsers />}
      value={groups.length.toString()}
      change="+ 2% from last month"
      caption="Grupos creados"
    />
  );
};

export const MonthlyGrowthCard = () => {
  return (
    <MetricCard
      title="Monthly"
      icon={<FaChartLine />}
      value="Sigue avanzando!"
      caption="Crecimiento mensual"
    />
  );
};
