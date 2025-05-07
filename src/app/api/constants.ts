const SCOPES = {
  OWNER: [
    "workspace:view",
    "workspace:edit",
    "project:edit",
    "file:upload",
    "run:start",
    "run:cancel",
    "user:invite",
  ],
  ADMIN: ["workspace:view", "project:edit", "file:upload", "run:start"],
  VIEWER: ["workspace:view", "project:view", "file:view"],
};

/*

workspace:view	Ver workspaces a los que se tiene acceso
workspace:edit	Editar nombre, tipo o detalles del workspace
workspace:invite	Invitar usuarios a un workspace
project:view	Ver todos los proyectos del workspace
project:edit	Crear o editar un proyecto
project:delete	Eliminar un proyecto
file:upload	Subir archivos genómicos
file:delete	Eliminar archivos
run:start	Iniciar una ejecución de pipeline
run:cancel	Cancelar una ejecución
tag:manage	Crear/editar tags
user:manage	Gestionar usuarios de la organización
license:view	Ver detalles de la licencia activa
sample:edit	Agregar o modificar datos de muestra


*/
