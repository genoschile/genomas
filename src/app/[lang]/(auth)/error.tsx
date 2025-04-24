"use client"

type ErrorProps = {
  statusCode?: number;
  message?: string;
};

const Error: React.FC<ErrorProps> = ({ statusCode = 500, message }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.status}>{statusCode}</h1>
      <h2 style={styles.title}>Ocurrió un error</h2>
      <p style={styles.message}>{message || "sorry. something went wrong"}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    padding: "1rem",
    textAlign: "center",
  },
  status: {
    fontSize: "6rem",
    fontWeight: "bold",
    color: "#e63946",
    margin: "0",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#333",
    margin: "0.5rem 0",
  },
  message: {
    fontSize: "1rem",
    color: "#666",
    maxWidth: "400px",
  },
};

export default Error;
