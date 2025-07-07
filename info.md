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

- reunión genomas 24-06

- websiteMathBio: generación content news, content users, content publications
- websiteMathBio: implementación popover
- todo: eliminar popover en sm windows

- reunión administración sistemas 27 - 06 admin system UDD
- montar todo dentro de la mv
  y configure el tema de los workers
- VOLUMEN: SCRIPT.NF
- VOLUMEN: DEFINIR CARPETA PARA OUTPUTS
- VOLUMEN: REFERENCIAS
- comando del primer worker VCF
- archivo configuración
- samplesheet
- VCF PRUEBA
- SAMPLESHEET DE PRUEBA
- TODO: SCRIPT AUTOMÁTICO PARA CREAR EL SAMPLESHEET
- TODO: VCF VALIDATE
- TODO: ENCONTRAR OUTPUT
- se hablo de abrir los port con informatica con udd
- TODO: Probar proxy jump
- modificación interfaz groups

# semana 01-07-2025

- avances mathbio
- generación page que se llena con pdf de un static directory, permite agregar eliminar o editar los pdf de las publicaciones de una manera más limpia. existe una falla, las publicaciones no tienen un link descarga, es por eso que se genero un repositorio de pdfs, intentando cubrir el error

> [!NOTE]
> No sé como hacer esa vinculación, ya que hay que ver pdf por pdf, es un trabajo tedioso no imposible jeje

- todo: vincular pdf, con las publicaciones

- se corrigio error de las imagenes, fix header sm, se muestran los colaboradores en un acordion
- se oculta el popover para sm

- se actualizo imagen profesora karem y se agregaron 2 imágenesa a la gallery

> [!WARNING]
> Ya testeado el vps no es el problema del pq la pagina no presenta ssl. La compra del dominio (genomas) , se generó en una plataforma? no sé pagina que no cuenta con zone dns. No se sabe si es tipo AAA o no.

<h1 style="color:red">AYUDA: <small>no sé como corregir eso, la solución es configurar la zone dns en el propio vps pero sería raro.</small>
</h1>

- se presenta primera versión estable de la pagina, no quiere decir que este lista, faltan revisiones por parte de la jefatura, comentarios de feedback, que se generen los content correctos para cada pagina como por ejemplo:

```json
{
  "title": "Contact Us",
  "description": "Get in touch with our lab for inquiries, collaborations, or feedback.",
  "contactCard": {
    "header": "Our Address & Details",
    "location": {
      "title": "Lab Location",
      "address": "123 Science Avenue, Tech Park\nResearch City, ST 90210\nUnited States"
    },
    "email": {
      "title": "Email Us",
      "address": "info@labnotes.example.com"
    },
    "phone": {
      "title": "Call Us",
      "number": "+1 (234) 567-890"
    },
    "officeHours": {
      "title": "Office Hours",
      "weekdays": "Monday - Friday: 9:00 AM - 5:00 PM",
      "weekends": "Weekends & Holidays: Closed"
    }
  },
  "mapSection": {
    "title": "Find Us Here"
  }
}
```

> [!NOTE]
> además del ejemplo anterior existen 7 content (8 en total) que es necesario revisar para validar la información.
> Junto con eso es necesario tambien, retirar el contenido "Lorem". Faltan comentarios de feedback pero aquí se generó la primera versión estable ya se puede visitar.

- link de visita: [link](http:mathbio.genomas.cl)

<h2>avances genomas</h2>
<ul>
  <li>
  se genero la primera version del feature de ia suggestion (genomas enterprise) (en css)
  problemas en comunicación mensaje cliente respuesta servidor, llega el body mejorar api, quizás expiro el api token o key jeje
  </li>

  <li>se agrego un nuevo modal de ayuda a la suggestions ( o entende para que son)</li>
  <li>mejora acciones groups, implementando el delete y el edit jeje</li>

  <li>se agregaron dos modales, </li>
  se genero nuevo, useCaseGroups, nueva interfaz de groups, un repositorio para groups, con los primeros métodos de delete y edit
  TODO: se generará un archivo de endpoint para tener todo más ordenado y centralizado

se avanzo en el todo, se orquesto un routes que exporta todas las rutas y se conforma de standalone modules jeje, se empezo a modificar el codigo dentro para funcionar a partir del orquestador, se mejorá fileprocess

se corrigio error de timelines en contact section, este error hacia que cada li creciera como container, y se empezo a generar el responsive del componente

se genera una nueva migración para agregar onDelete: Cascade user - group

se elimino el hooks use de las listas en los modales, se agrego, error.tsx, global-error.tsx y loading .tsx se mejoro visualmente el selected groups, se agrego el filterterm, ahora se pueden exportar los grupos selecionados en csv o json, habilita boton para seleccionarlos todos, se corrigio error que al agregar un groups, no se actualizaba el contexto, se agrego un raid-limit para prevenir loops infinitos,

TODO: eliminar grupos con project y editar grupos queda en todo por pensar como solucionarlo

</ul>

# semana 07-07-2025

se generó el primer build de la aplicación se solucionaron 7 erróres críticos, la pagina ya esta disponible en genomas.cl (sin ssl)

solo funciona correctamente en chrome y en desktop
no se puede usar la api en build

TODO: mejoras variables de entorno para que funcionen con el dominio genomas.cl
TODO: 

se mejoro responsive de la landing, corrección de erróres
ahora se desabilitaron los link que no tenian funcionalidad (para no confundir al usuario)

en el login y en el signup ahora el campo contraseña puede alternar el estado visible

trabajando en @media 640px

se agrego nueva instancia en core **
se definio el handle para que el useCaseSuggestion funcione y devuelva la respuesta correcta del modelo
TODO: se corrigirá el error de la transacción en infraestructura (mal implementada), se generá un caso de uso, para crear una organización con un usuario admin por default