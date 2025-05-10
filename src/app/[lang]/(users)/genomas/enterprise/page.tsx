import { FaRegCopy, FaUser } from "react-icons/fa";
import "./style.css";

export default function page() {
  return (
    <>
      <h1>Welcome genomas dashboard enterprice</h1>

      <article>
        <h1>Key Metrics</h1>

        <Metrics />
      </article>

      <article className="admincredential">
        <h1>Organization Admin credentials</h1>

        <AdminCredentials />
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
          <small>
            <mark>+ 12% from last month</mark>
          </small>
        </main>

        <figure>
          <figcaption>hola</figcaption>
          <img src="/images/carrousel/car1.svg" alt="" />
        </figure>
      </div>
      <div className="box box-metrics">
        <header>
          <h1>Total Groups</h1>
          <FaUser />
        </header>

        <main>
          <strong>1,250</strong>
          <small>
            <mark>+ 2% from last month</mark>
          </small>
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
          <small>
            <mark>+ 12% from last month</mark>
          </small>
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
import { VscAccount } from "react-icons/vsc";
import { MdManageAccounts } from "react-icons/md";

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

export const AdminCredentials = () => {
  return (
    <div className="admincredential--container">
      <header>
        <div>
          <h1>Genomas Innovations</h1>
          <button>
            <VscAccount />
          </button>
        </div>
        <small>Administrator access credentials for genomas Innovation</small>
      </header>

      <figure>
        <img src="/images/carrousel/car1.svg" alt="" />
      </figure>

      <fieldset>
        <legend>credentials</legend>

        <div>
          <label htmlFor="">
            Correo
            <input type="text" />
          </label>

          <label htmlFor="">
            Password
            <div>
              <input type="password" />
              <button>
                <FaRegCopy />
              </button>
            </div>
          </label>
        </div>
      </fieldset>

      <hr />

      <footer>
        <small>Ensure these credentials are stored securely.</small>

        <a>
          <MdManageAccounts /> Switch Session to User
        </a>
      </footer>
    </div>
  );
};
