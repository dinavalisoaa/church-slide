import "../../App.css";

const calculateFontSize = (text, maxWidth) => {
  const baseFontSize = 120; // Taille de police de base
  const estimatedWidth = text.length * 8; // Largeur estimée (8px par caractère)
  return estimatedWidth > maxWidth
    ? (maxWidth / estimatedWidth) * baseFontSize
    : baseFontSize;
};

function Verses(props) {
  const data = props.data;
  console.log("Dataverses=", data);

  return (
    <div style={{ width: "100%", height: "100%", padding: "10px", boxSizing: "border-box" }}>
      {data.map((element, index) => (
        <Paragraph key={index} text={element} />
      ))}
    </div>
  );
}

const Paragraph = ({ text }) => {
  const maxWidth = 800; // Largeur maximale (en pixels)
  const fontSize = calculateFontSize(text, maxWidth);

  return (
    <p
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: "1.2",
        margin: "0 0 10px",
        width: "100%",
        wordBreak: "break-word",
        textAlign:"center", // center,end,left,justify,right,start,inherit,initial,revert,revert-layer,unset 
       
        whiteSpace: "pre-wrap", // Respecte les sauts de ligne
      }}
    >
      {text}
    </p>
  );
};

export default Verses;
