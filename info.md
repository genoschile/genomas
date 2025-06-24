# semana 21-06-2025 (sábado)

- Mejoras en estilos (ver commits)
- Se reconoce el project seleccionado, y se muestra la info (id)
  falta hacer el fetch y mejorar componentes del sidebarInfoCardSelected
- todo: se necesita adaptar el modal de addMembers para que identique el project selected
- todo: para habilitar la trash se modificará la tabla de base de datos para un campo de isActive o algo así
- se genera el objeto requerido para el contrato de la siguiente forma

```ts
const ExampleResFastAPI = {
  organizationId: "org-123" /* ✔️ */,
  userId: "user-456" /* ✔️ */,
  workspaceId: "workspace-789" /* ✔️ */,
  inputFiles: [] /* ✔️ */,
  workerName: "worker-1" /* ✔️ */,
  genomeVersionRef: "hg38" /* ✔️ */,
};
```

[!NOTE]

> Necesito saber como será el manejo de los archivos en el sentido de moverlos entre servicios. En la solución actual en desarrollo lo que se hace es solo mandar el path donde está ubicado el archivo

[!IMPORTANT]

> El almacenamiento de los archivos es organizationId > workspacesId > n-project > n-files (mejorable)

- se mejoro el desbordamiento de las opciones de archivos (overflow fix), ahora se calcula con fakeul (interesante y mejorable)
- se mejoró el script de nextflow en ApiResourceAnnomaf en donde simula y se set un time para que simule un proceso largo, y devuelve un pdf por default de reporte.
- se seteo un article y un div por default para estandarizar los contenedores, es mejorable ya que article especificos quizás necesitan menos espacio

[!WARNING]

> Necesito de verdad entender la distribución o cómo o en que carpeta se guardarán los archivos de salida del pipeline, sería ideal pero utópico quizás que se guarden en la misma carpeta pero con un attr de type "output"

[!NOTE]

> Se corrigieron y avanzaron en más cosas, ver commits para más info.

[Img de avances](./imgAvances/semana-21-06-2025/image.png)

# semana 24-06-2025 (Lunes)

lunes:

- se corrigio labels form de enterprise signup
- ahora al añadir un project (enterprise) se actualiza el estado global de project
- se añada cmdk a la interfaz de genomas enterprise
- se habilito modal de usuarios (addUserEnterprise) en la interfaz de enterprise
- ahora al añadir un users (enterprise) se actualiza el estado global de users
- reunión constanza para esquema de estructura organizacional
- ahora al añadir un groups (enterprise) se actualiza el estado global de groups
- TODO: se necesita un ssh key para la maquina virtual (correo lab) GITHUB
- se implemento un bento (todavía falta corregir en el home de genomas enterprise)
- TODO: la app se cae, investigar el problema
- se realizo la conex de websocket + fastapi
- se sincroniza las tareas con el article de process status