import { NextResponse } from "next/server";

let runs = [
  {
    pipeline: "AnnoMAF",
    status: "Completado",
    statusType: "success",
    color: "var(--color-secondary)",
    path: "/projects/genomas/runs/annomaf/CC001BTUCH",
    runId: "CC001BTUCH",
    sampleType: "Somatic",
    date: "2024-10-26",
    duration: "1h 25m",
    progress: 100,
    logs: 0,
    cost: "~125 créditos",
    tags: ["Sensibles"],
  },
  {
    pipeline: "Sarek",
    status: "En progreso",
    statusType: "in-progress",
    color: "var(--color-primary)",
    path: "/projects/genomas/runs/sarek/CC002PAGL",
    runId: "CC002PAGL",
    sampleType: "Germline",
    date: "2024-10-25",
    duration: "35m",
    progress: 45,
    logs: 0,
    cost: "~52 créditos",
    tags: [],
  },
];

export async function GET() {
  return NextResponse.json(runs);
}

export async function DELETE(request: Request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();

  runs = runs.filter((run) => run.runId !== id);
  return NextResponse.json({ message: "Run eliminado" });
}
