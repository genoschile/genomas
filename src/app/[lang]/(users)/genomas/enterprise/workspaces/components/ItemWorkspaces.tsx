import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { Fa0 } from "react-icons/fa6";

export const ItemWorkspace = () => {
  return (
    <li className="container__list-workspaces-item">
      <div>
        <header>
          <div>
            <h1>Nombre del workspace</h1>
            <IconRoundedFull icon={<Fa0 />} />
          </div>
          <p>Descripción del workspace</p>
        </header>

        <figure>
          <div>
            hola
          </div>
        </figure>

        <article>
          <p>Projects ({2}) </p>
        </article>

        <article>
          <p>Assigned Groups ({2}) </p>
        </article>

        <article>
          <p>Assigned Users ({2}) </p>
        </article>

        <hr />
        <footer>
          <button>Editar</button>
          <button>Eliminar</button>
        </footer>
      </div>
    </li>
  );
};
