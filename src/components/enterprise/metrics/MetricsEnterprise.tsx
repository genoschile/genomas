import { FaChartLine, FaUser, FaUsers } from "react-icons/fa";
import "./metricsEnterprise.css";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";

const metrics = [
  {
    title: "Total Users",
    icon: <FaUser />,
    value: "1,250",
    change: "+ 12% from last month",
    image: "/images/carrousel/car1.svg",
    caption: "Usuarios activos",
  },
  {
    title: "Total Groups",
    icon: <FaUsers />,
    value: "320",
    change: "+ 2% from last month",
    image: "/images/carrousel/car2.svg",
    caption: "Grupos creados",
  },
  {
    title: "Monthly Growth",
    icon: <FaChartLine />,
    value: "8.5%",
    change: "+ 1.3% from last month",
    image: "/images/carrousel/car3.svg",
    caption: "Crecimiento mensual",
  },
];

export const MetricsEnterprise = () => {
  return (
    <div className="grid-container">
      {metrics.map((item, index) => {
        return (
          <div className="box box-metrics" key={index}>
            <header>
              <h1>{item.title}</h1>
              <IconRoundedFull icon={item.icon} />
            </header>

            <main>
              <strong>{item.value}</strong>
              <small>
                <mark>{item.change}</mark>
              </small>
            </main>

            <figure>
              <figcaption>{item.caption}</figcaption>
              <img src={item.image} alt={item.title} />
            </figure>
          </div>
        );
      })}
    </div>
  );
};
