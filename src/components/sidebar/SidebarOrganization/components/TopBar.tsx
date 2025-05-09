import { FiCalendar } from "react-icons/fi";

export function TopBar() {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderBottom: "1px solid #E5E7EB",
        paddingInline: "1rem",
        paddingBottom: "1rem",
        marginBottom: "1rem",
        marginTop: "0.5rem",
        position: "sticky",
        top: "0",
        zIndex: 100,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="flex items-center justify-between p-0.5 divide-x-0"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.125rem",
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            Good Morning!
          </span>
          <span
            className="text-xs block text-stone-500"
            style={{
              fontSize: "0.75rem",
              color: "#6B7280",
            }}
          >
            Martes 14 9tg 2025
          </span>
        </div>

        <button
          className="flex text-sm items-center gap-2 border-sm transition-colors hover:bg-violet-100 hover:text-violet-700 rounded cursor-pointer"
          style={{
            padding: "0.75rem",
          }}
        >
          <FiCalendar />
          <span className="">Pendientes</span>
        </button>
      </div>
    </div>
  );
}
