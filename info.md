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
- comando del primer worker VCF <=> need it
- archivo configuración
- samplesheet
- VCF PRUEBA
- SAMPLESHEET DE PRUEBA
- TODO: SCRIPT AUTOMÁTICO PARA CREAR EL SAMPLESHEET
- TODO: VCF VALIDATE
- TODO: ENCONTRAR OUTPUT
- se hablo de abrir los port con informatica con udd
- TODO: Probar proxy jump => we're here
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

se agrego nueva instancia en core \*\*
se definio el handle para que el useCaseSuggestion funcione y devuelva la respuesta correcta del modelo
TODO: se corrigirá el error de la transacción en infraestructura (mal implementada), se generá un caso de uso, para crear una organización con un usuario admin por default

se agrego el ssl a genomas.cl, mathbio.genomas.cl

TODO: se teoriza que el problema de la carga parcial o hidratación de css en dispositivos moviles es por los import en cada componente, segun la guia de nextjs que no vi se recomienda el uso de css modules, hay que cambiar eso.

TODO: PROBAR PROXY JUMP SI NO

propuesta!

=>
Arquitectura: "Orquestador de Pipelines Seguros"
Esta arquitectura permite tener una interfaz de usuario moderna (Next.js) que orquesta la ejecución de flujos de trabajo computacionales intensivos (Nextflow) en una máquina virtual remota y privada, todo mientras la API principal permanece accesible y separada, y la comunicación se realiza de forma segura a través de un "proxy jump".

Arquitectura: "Orquestador de Pipelines Seguros"
Esta arquitectura te permite tener una interfaz de usuario moderna (Next.js) que orquesta la ejecución de flujos de trabajo computacionales intensivos (Nextflow) en una máquina virtual remota y privada, todo mientras la API principal permanece accesible y separada, y la comunicación se realiza de forma segura a través de un "proxy jump".

Flujo de Trabajo Simplificado:
El Usuario Pide Ejecutar (Next.js)

Tu aplicación Next.js, a la que acceden los usuarios, recolecta los datos necesarios y envía una solicitud a tu API de Backend.

La API de Backend Recibe y Delega (Python)

Tu API (Flask, FastAPI, etc.), que está fuera de la máquina virtual, recibe la solicitud.

En lugar de ejecutar el Nextflow directamente, crea una tarea asíncrona y la envía a la cola de Redis para que la procese Celery. Esto mantiene tu API ágil y responsiva.

Celery se Prepara para el Salto (Python Celery Worker)

Un Worker de Celery, que también reside fuera de la máquina virtual (posiblemente en el mismo servidor que tu API o un VPS separado que hará de "proxy jump"), toma la tarea de la cola de Redis.

Este worker sabe que tiene que llegar a una VM privada.

El Salto Seguro al Destino (Proxy Jump + SSH)

El Worker de Celery inicia una conexión SSH (usando librerías como paramiko) al servidor de "proxy jump".

Desde ese servidor de "proxy jump", el Worker de Celery establece una segunda conexión SSH a la Máquina Virtual de Nextflow, que es privada y no está directamente expuesta a internet.

Ejecución del Pipeline Remoto (Nextflow en la VM)

Una vez conectado a la VM, el Worker de Celery le da la orden a la VM para que ejecute el comando nextflow run ... con los parámetros necesarios.

Nextflow dentro de la VM se encarga de todo el procesamiento pesado.

Actualización de Estado y Resultados (Redis/DB)

El Worker de Celery puede monitorear la ejecución del Nextflow y actualizar el estado de la tarea en Redis (o en una base de datos) para que tu API y Next.js puedan informar al usuario sobre el progreso o si el pipeline terminó.

## correo

1er desafio: almacenar los archivos
2do desafio: generar un endpoint que consulte la mv

## genomas

se hicieorn 2 helper uno para la infraestructura de la api, y otro para el front que es para reutilizar los catch try

# semana 14-07-2025

breaking changes repositorio annomaf, configuración exitosa de paramiko, se consulta la memoria disponible

se gestionaron los docker después de varios testeos, para generar los docker de vps, y vm, junto además con la primera propuesta para generar los workers

se generó el primer worker test con exito, al tener nextflow soporte nativo a s3, se pudo almacenar la salida de un pipeline dentro del s3 de minio (standart big data)

se genero un install para el worker uno, para generar la imagen, la idea es que con una imagen se generen n-containers
y sería la propuesta para futuros workers

> [!NOTE]
> ES NECESARIO QUE TODOS LOS WORKERS SE EJECUTEN EN LA MISMA RED (DOCKER NETWORKS)

se modificaron los requiriments, ya no dependemos de uvicorn solo de fastapi

TODO: Necesito tener acceso al repositorio desde la cuenta de mathbio-gitlab
TODO: Vps 1 se quedó sin espacio, sería posible comprar otra? jeje solo por un mes para
TODO: ejecutar los docker en minio
TODO: hacer pruebas de conectividad, y hacer cambios para implementar paramiko a la ecuación del primer worker test
todo: el install en el root directory del project de APIRESOURCEANNOMAF quedo deprecado, veré una futura forma de adaptarlo a lo nuevo NO USAR!

TODO: Cola de tareas separada tipo scheduler
Puedes diseñar un componente scheduler que mantenga una cola de tareas pending y revise periódicamente (cada minuto, por ejemplo) si ya hay recursos. Si los hay, saca una tarea pending y la lanza.

```py
# Script remoto para evaluar memoria libre mínima
MEM_DISPONIBLE=$(free -m | awk '/Mem:/ {print $7}')  # Memoria libre real
MINIMO=4096  # 4GB

if [ "$MEM_DISPONIBLE" -lt "$MINIMO" ]; then
    echo "NOT_ENOUGH_MEMORY"
    exit 1
else
    echo "ENOUGH_MEMORY"
    exit 0
fi

```

TODO: DEFINIR S3 SAVE
todo: Definir entrega structure workers
todo: que pasara con la info que le llega a la api

const worker_vcf = () => { organizationId, userId, workspaceId, inputFiles, workerName, genomeVersionRef(hg19?, hg38) }

# semana 21-07-2025

se reestructuro project, se elimino ruta genomas pq quedaba raro genomas.cl/genomas/user

se genero en landing una section de pipelines para que pipe route tenga sentido

se corrigio error en el login

se migró base de datos de genomas que se encontraba en mi vps personal al de la profesora karen
