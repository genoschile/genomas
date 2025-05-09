import { FaUser } from "react-icons/fa";
import "./style.css";

export default function page() {
  return (
    <>
      <h1>Welcome genomas dashboard enterprice</h1>

      <article>
        <h1>Key Metrics</h1>

        <Metrics />
      </article>

      <article>
        <h1>Quick Actions</h1>

        <QuickActions />
      </article>
    </>
  );
}

export const Metrics = () => {
  return (
    <div className="grid-container">
      <div className="box box-metrics">
        <header>
          <h1>Total User</h1>
          <FaUser />
        </header>

        <main>
          <strong>1,250</strong>
          <small>+ 12% from last month</small>
        </main>

        <figure>
          <figcaption>hola</figcaption>
          <img src="/images/carrousel/car1.svg" alt="" />
        </figure>
      </div>
      <div className="box box-metrics">
        <header>
          <h1>Total User</h1>
          <FaUser />
        </header>

        <main>
          <strong>1,250</strong>
          <small>+ 12% from last month</small>
        </main>

        <figure>
          <figcaption>hola</figcaption>
          <img src="/images/carrousel/car1.svg" alt="" />
        </figure>
      </div>
      <div className="box box-metrics">
        <header>
          <h1>Total User</h1>
          <FaUser />
        </header>

        <main>
          <strong>1,250</strong>
          <small>+ 12% from last month</small>
        </main>

        <figure>
          <figcaption>hola</figcaption>
          <img src="/images/carrousel/car1.svg" alt="" />
        </figure>
      </div>
    </div>
  );
};

import { IoMdAddCircleOutline } from "react-icons/io";

export const QuickActions = () => {
  return (
    <div className="grid-container">
      <div className="box box-link">
        <div>
          <IoMdAddCircleOutline size={24} />
        </div>
        <a href="#">Create New Users</a>
      </div>
      <div className="box box-link">
        <div>
          <IoMdAddCircleOutline size={24} />
        </div>
        <a href="#">Create New Groups</a>
      </div>
    </div>
  );
};
