import RunCard from "./RunCard";

export interface RunData {
    pipeline: string;
    status: string;
    statusType: "success" | "in-progress" | "failure";
    color: string;
    path: string;
    runId: string;
    sampleType: string;
    date: string;
    duration: string;
    progress: number;
    logs: number;
    cost: string;
    tags: string[];
}[]

const data: RunData[] = [
  {
    "pipeline": "AnnoMAF",
    "status": "Completado",
    "statusType": "success",
    "color": "var(--color-secondary)",
    "path": "/projects/genomas/runs/annomaf/CC001BTUCH",
    "runId": "CC001BTUCH",
    "sampleType": "Somatic",
    "date": "2024-10-26",
    "duration": "1h 25m",
    "progress": 100,
    "logs": 0,
    "cost": "~125 créditos",
    "tags": ["Sensibles"]
  },
  {
    "pipeline": "Sarek",
    "status": "En progreso",
    "statusType": "in-progress",
    "color": "var(--color-primary)",
    "path": "/projects/genomas/runs/sarek/CC002PAGL",
    "runId": "CC002PAGL",
    "sampleType": "Germline",
    "date": "2024-10-25",
    "duration": "35m",
    "progress": 45,
    "logs": 0,
    "cost": "~52 créditos",
    "tags": []
  },
  {
    "pipeline": "BLAST",
    "status": "Fallido",
    "statusType": "failure",
    "color": "var(--color-tertiary)",
    "path": "/projects/genomas/runs/blast/CC003ABF",
    "runId": "CC003ABF",
    "sampleType": "Bacterial",
    "date": "2024-10-24",
    "duration": "--",
    "progress": 10,
    "logs": 1,
    "cost": "~15 créditos",
    "tags": []
  }
]


export const Runs = () => {
  return (
    <section className="main">
      {data.map((item, index) => (
        <RunCard key={index} data={item} />
      ))}
    </section>
  );
}