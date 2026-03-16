export default function Styles() {
  const baseStyle = {
    padding: "6px",
    marginTop: "4px",
  };

  const accentStyle = {
    color: "white",
    backgroundColor: "teal",
  };

  return (
    <div>
      <h4>Styles</h4>
      <div style={{ color: "purple", fontWeight: "bold" }}>Inline JSON style object</div>
      <div style={{ ...baseStyle, ...accentStyle }}>Spread style objects</div>
    </div>
  );
}