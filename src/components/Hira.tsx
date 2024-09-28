import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from "react";
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

function Hira(props: {
  andininy: string;
  hira: string;
  key: number;
  title: string | null;
}) {
  const [data, setData] = useState([]);
  const [includeAnd, setIncludeAnd] = useState([]);
  const isPresent = (and_index: number) => {
    let cpt=0;
    if (includeAnd.length > 0) {
      includeAnd.map((value) => {
        
        if (value!=undefined && (and_index) == parseInt(value)) {
          console.log(
            "True.....",
            includeAnd,
            ".....<<<<.....>>>>..",
            "and_index<=>",and_index,"..",parseInt(value)
          );
          cpt++;
        }
      });
      if(cpt>0){
        return true;

      }
      return false;
    }
    if (includeAnd.length == 0) {
      return true;
    }
    console.log("False.....", includeAnd, ".....<<<<.....>>>>..",    "and_index<=>",and_index);

    return false;
  };
  useEffect(() => {
    const data = props.andininy;
    if (data != undefined) {
      setIncludeAnd(data.split(","));
    }
    fetch("/ressources/hira/01_fihirana_ffpm.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.fihirana[props.hira].hira);
      })
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);

  return (
    <>
      <section key={props.key}>
        <section key={1}>
          <div style={{ fontSize: 80 }}>{props.title}</div>
        </section>
        {data.map(
          (hira, index) =>
            isPresent(hira.andininy) && (
              <section
                style={{ textWrap: "pretty" }}
                key={(index + 1).toString() + "-1"}
                style={{ display: "None" }}
                hidden={false}
              >
                <div style={{ fontSize: 60 }}>
                  <p>{hira.andininy}</p>
                  <Andininy data={hira.tononkira} and={hira.andininy} />{" "}
                </div>
              </section>
            )
        )}
      </section>
    </>
  );
}
export default Hira;
