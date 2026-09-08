export function CxBox({ label, value, children }) {
  return (
    <div className="cx-box">
      <div className="cx-label">{label}</div>
      <div className="cx-val">{value}</div>
      <div className="cx-note">{children}</div>
    </div>
  );
}

export default function Cx({ children }) {
  return <div className="cx-grid">{children}</div>;
}
