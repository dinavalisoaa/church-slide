import {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { RevealHandle, RevealSlides } from "./Reveal";
import { BiLogoGithub } from "react-icons/bi";
import HoverEffect from "hover-effect";
import Andininy from "./components/Andininy";
import Hira from "./components/Hira";

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";

import "./App.css";
import Reveal from "reveal.js";

// import './custom_theme_starter.css';

interface HoverEffectHandle {
  next: () => void;
  previous: () => void;
  destroy: () => void;
}

interface LiquidImageOptions {
  displacementImage: string;
  image1: string;
  image2: string;
  imagesRatio?: number;
  intensity?: number;
  intensity1?: number;
  intensity2?: number;
  angle?: number;
  angle1?: number;
  angle2?: number;
  speedIn?: number;
  speedOut?: number;
  hover?: boolean;
  easing?: string;
  video?: boolean;
}


// export default Presentation;
// export default App;

function Sections() {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  const revealRef = useRef<RevealHandle>(null);
  const goToSlide = (indexh: number, indexv: number) => {
    if (revealRef.current) {
      revealRef.current.getReveal()?.slide(indexh, indexv, 0);
      console.log("->>>>>>>>>>>>." + revealRef.current.getReveal());
    }
  };

  const [theme, setTheme] = useState("league");
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
  const liquidImageRef2 = useRef<HoverEffectHandle>(null);
  const [liquidInit, setLiquidInit] = useState(false);
  const [display, setDisplay] = useState(false);
  const timeDelta = 1000;
  const next = () => {
    console.log(Reveal.slide(3, 0, 0));
  };

  const handleSlideChange = (event) => {
    // if (event.indexh == 0)
    {
      fetch("/ressources/hira/01_fihirana_ffpm.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData.fihirana["ffpm_123"].hira);
        })
        .catch((error) =>
          console.error("Error fetching the JSON data:", error)
        );
    }
    revealRef.current?.getReveal()?.on("slidechanged", (event) => {
      console.log("Clicked....this", event);
      // onStateChange(revealRef.current!.getState());
    });
    if (event.indexv == 1) {
      setDisplay(true);
    }
  };
  return (
    <>
      <RevealSlides
        controls={false}
        plugins={[RevealZoom, RevealNotes]}
        onStateChange={(state) => console.log(state)}
        theme={"league"}
        transition="fade"
      >
          <Hira
            hira={"ffpm_" + "1"}
            key={"1"}
            title={"FFPM " + "1"}
          />
      </RevealSlides>
    </>
  );
}

function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/sections" element={<Sections />} />
        <Route
          path="/simple"
          element={<Hira hira="ffpm_635" key="1" title="FFPM 635" />}
        />

        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}
export default RouterComponent;
