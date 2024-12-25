import { useEffect, useRef, useState } from "react";
import { RevealHandle, RevealSlides } from "../../Reveal";
import Song from "./Song";

import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";

import "../../App.css";
import TransitionPage from "./TransitionPage";

function Slide() {
  useEffect(() => {}, []);

  const revealRef = useRef<RevealHandle>(null);

  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>(
    "bottom-right"
  );
  const [theme] = useState("sky");
  const [presState] = useState({
    indexh: -1,
    indexv: -1,
    indexf: -1,
    paused: false,
    overview: false,
  });
  return (
    <>
      <RevealSlides
        key="rs-2"
        scrollSnap="mandatory"
        backgroundTransition="convex"
        minScale={1}
        maxScale={1}
        transition="concave"
        width={"100%"}
        margin={0.01}
        controlsLayout={controlsLayout}
        presState={presState}
        plugins={[RevealZoom, RevealNotes]}
        theme={theme}
        ref={revealRef}
        controls
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
        <Song
          hira={"ffpm_" + "133"}
          key={1}
          andininy={null}
          title={"FFPM " + "133"}
        />
        <TransitionPage key={""}
          title="Asa sy fampaherezana"
          description="Avelao ny zaza anatona ahy fa azy ny fanjakan'ny lanitra,
           II Kor 12:1-3"
          image="/ressources/images/feo.jpg"
        />
        <Song
          hira={"ffpm_" + "325"}
          key={325}
          title={"FFPM " + "325"}
          andininy={null}
        />
        <TransitionPage
          title="FITIAVANA"
          key={""}
          image={undefined}
          description={""}
        />
        <Song
          hira={"ffpm_" + "342"}
          key={342}
          title={"FFPM " + "342"}
          andininy={null}
        />
        <Song
          hira={"ffpm_" + "124"}
          andininy={"3,4,5"}
          key={124}
          title={"FFPM " + "124"}
        />
        <Song
          hira={"ffpm_" + "90"}
          key={90}
          title={"FFPM " + "90"}
          andininy={null}
        />
      </RevealSlides>
    </>
  );
}

export default Slide;
