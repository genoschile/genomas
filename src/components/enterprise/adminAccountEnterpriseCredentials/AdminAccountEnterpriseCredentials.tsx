import { FaRegCopy } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

import "./adminAccountEnterpriseCredentials.css";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";

export const AdminAccountEnterpriseCredentials = () => {
  return (
    <div className="admincredential--container">
      <header>
        <div>
          <h1>Genomas Innovations</h1>
          <IconRoundedFull icon={<VscAccount />} />
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
