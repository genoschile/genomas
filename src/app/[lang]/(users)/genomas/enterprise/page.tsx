export default function page() {
  return (
    <div className="grid-container">
      <div className="box" style={{ gridArea: "box-1" }}></div>
      <div className="box" style={{ gridArea: "box-2" }}></div>
      <div className="box" style={{ gridArea: "box-3" }}></div>
      <div className="box" style={{ gridArea: "box-4" }}></div>
      <div className="box" style={{ gridArea: "box-5" }}></div>
    </div>
  );
}
