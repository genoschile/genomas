import { JSX } from "react";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";
import { FaChartLine, FaUser, FaUsers } from "react-icons/fa";

type Props = {
  title: string;
  icon: JSX.Element;
  value: string;
  change: string;
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

export const TotalUsersCard = () => (
  <MetricCard
    title="Total Users"
    icon={<FaUser />}
    value="1,250"
    change="+ 12% from last month"
    caption="Usuarios activos"
  />
);

export const TotalGroupsCard = () => (
  <MetricCard
    title="Total Groups"
    icon={<FaUsers />}
    value="320"
    change="+ 2% from last month"
    caption="Grupos creados"
  />
);

export const MonthlyGrowthCard = () => (
  <MetricCard
    title="Monthly Growth"
    icon={<FaChartLine />}
    value="8.5%"
    change="+ 1.3% from last month"
    caption="Crecimiento mensual"
  />
);
