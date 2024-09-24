import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { RevealHandle, RevealSlides } from "../Reveal";
import { BiLogoGithub } from "react-icons/bi";
import HoverEffect from "hover-effect";

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";

import "../App.css";
import Reveal from "../reveal.js";
import Andininy from "./Andininy";

function Hira(props) {
  const [data, setData] = useState([]);
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance
  useEffect(() => {
    fetch("/ressources/hira/01_fihirana_ffpm.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.fihirana[props.hira].hira);
      })
      .catch((error) => console.error("Error fetching the JSON data:", error));
    // Prevents double initialization in stric  t mode
    // if (deckRef.current) return;

    // deckRef.current = new Reveal(deckDivRef.current!, {
    //   transition: "slide",
    //   // other config options
    // });

    // deckRef.current.initialize().then(() => {
    //   // good place for event handlers and plugin setups
    // });

    // return () => {
    //   try {
    //     if (deckRef.current) {
    //       deckRef.current.destroy();
    //       deckRef.current = null;
    //     }
    //   } catch (e) {
    //     console.warn("Reveal.js destroy call failed.");
    //   }
    // };
  }, []);

  return (
    <>
      <section key={props.key}>
        <section key={1}>
          <div style={{ fontSize: 100 }}>{props.title}</div>
        </section>
        {data.map((hira, index) =>
          data[index] ? (
            <section
              key={(index + 1).toString() + "-1"}
              style={{ display: "None" }}
              hidden={false}
            >
              <div style={{ fontSize: 60 }}>
                <p>{hira.andininy}.</p>
                <Andininy data={hira.tononkira} and={hira.andininy} />{" "}
              </div>
            </section>
          ) : (
            <p>Chargement...</p>
          )
        )}
      </section>
    </>
  );
}
export default Hira;
