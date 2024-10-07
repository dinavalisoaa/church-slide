import {
    CSSProperties,
    useEffect,
    useRef,
    useState,
  } from "react";
  import { RevealHandle, RevealSlides } from "../../Reveal";
  import Hira from "./Song";
  
  import RevealNotes from "reveal.js/plugin/notes/notes";
  import RevealZoom from "reveal.js/plugin/zoom/zoom";
  
  import "../../App.css";
  import TransitionPage from "./TransitionPage";
  

function Slide() {
    const [data, setData] = useState([]);
  
    useEffect(() => {}, []);
  
    const revealRef = useRef<RevealHandle>(null);
  
    const [theme, setTheme] = useState("sky");
    const [presState, setPresState] = useState({
      indexh: -1,
      indexv: -1,
      indexf: -1,
      paused: false,
      overview: false,
    });
    const [useCustomTheme] = useState(false);
    const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>(
      "edges"
    );
    const [index, setIndex] = useState(0);
    const [headerFontColor, setHeaderFontColor] = useState("white");
    const [headerOpacity, setHeaderOpacity] = useState(0);
    const [headerVisible, setHeaderVisible] =
      useState<CSSProperties["visibility"]>("hidden");
    const [liquidInit, setLiquidInit] = useState(false);
    const [display, setDisplay] = useState(false);
  
    return (
      <>
        <RevealSlides
          key="rs-2"
          scrollSnap="mandatory"
          minScale={1}
          maxScale={1}
          transition="slide"
          width={"100%"}
          margin={0.01}
          controlsLayout={controlsLayout}
          presState={presState}
          plugins={[RevealZoom, RevealNotes]}
          theme={theme}
          ref={revealRef}
          // controls={false}
          // plugins={[RevealZoom, RevealNotes]}
          // onStateChange={(state) => console.log(state)}
          // theme={"sky"}
          // minScale={1}
          // maxScale={1}
          // transition="fade"
          // width={"100%"}
          // margin={0.01}
          // transition="slide"
        >
          <Hira
            hira={"ffpm_" + "1"}
            key={1}
            andininy={"1,3,4 "}
            title={"FFPM " + "1"}
          />
          <TransitionPage
            title="Asa sy fampaherezana"
            description="Avelao ny zaza anatona ahy fa azy ny fanjakan'ny lanitra,
           II Kor 12:1-3"
            image="/ressources/images/feo.jpg"
          />
          <Hira hira={"ffpm_" + "325"} key={325} title={"FFPM " + "325"} />
          <TransitionPage title="FITIAVANA" />
          <Hira hira={"ffpm_" + "342"} key={342} title={"FFPM " + "342"} />
          <Hira
            hira={"ffpm_" + "124"}
            andininy={"3,4,5"}
            key={124}
            title={"FFPM " + "124"}
          />
          <Hira hira={"ffpm_" + "90"} key={90} title={"FFPM " + "90"} />
        </RevealSlides>
      </>
    );
  }

export default Slide;
