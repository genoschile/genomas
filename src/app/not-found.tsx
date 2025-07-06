"use client";
export default function NotFound() {

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        color: "#333",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0 }}>😿</h1>
      <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>
        Oops! Página no encontrada.
      </h2>
      <p
        style={{
          maxWidth: "400px",
          marginBottom: "2rem",
          fontSize: "1.1rem",
          color: "#555",
        }}
      >
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
    </main>
  );
}
