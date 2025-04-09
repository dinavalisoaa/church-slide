
const calculateFontSize = (text, maxWidth) => {
    const baseFontSize = 150; // Taille de police de base
    const estimatedWidth = text.length * 8; // Largeur estimée (8px par caractère)
    return estimatedWidth > maxWidth
        ? (maxWidth / estimatedWidth) * baseFontSize
        : baseFontSize;
};

function Verses(props) {
    const data = props.data;
    return (
        <div >
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
           //     lineHeight: "1.2",
                //margin: "0 0 10px",
            //    wordBreak: "break-word",
                textAlign:"center", // center,end,left,justify,right,start,inherit,initial,revert,revert-layer,unset

              //  whiteSpace: "pre-wrap", // Respecte les sauts de ligne
            }}
        >
            {text}
        </p>
    );
};

export default Verses;
