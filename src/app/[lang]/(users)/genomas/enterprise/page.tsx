import "./style.css";

export default function page() {
  return (
    <>
      <h1>Welcome genomas dashboard enterprice</h1>

      <article>
        <h1>Key Metrics</h1>

        <Metrics />
      </article>

      <article>
        <h1>Quick Actions</h1>

        <QuickActions />
      </article>
    </>
  );
}

export const Metrics = () => {
  return (
    <div className="grid-container">
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </div>
  );
};

export const QuickActions = () => {
  return (
    <div className="grid-container">
      <div className="box"></div>
      <div className="box"></div>
    </div>
  );
};
