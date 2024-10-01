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
    let cpt = 0;
    if (includeAnd.length > 0) {
      includeAnd.map((value) => {
        if (value != undefined && and_index == parseInt(value)) {
         
          cpt++;
        }
      });
      if (cpt > 0) {
        return true;
      }
      return false;
    }
    if (includeAnd.length == 0) {
      return true;
    }
  

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
        let data_hira = jsonData.fihirana[props.hira].hira;
        setData(clusterAndininy(data_hira));
      })
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);
  const decom = (arr) => {
    const res = [];
    for (let i = 0; i < arr.length; i += 4) {
      res.push(arr.slice(i, i + 4));
    }
    return res;
  };

  const clusterAndininy = (data_hira) => {
    let data_vaovao = [];
    data_hira.map((data, index_i) => {
      let tononkira = data.tononkira;
      let tononkira_feno = tononkira.split("\n");
      let alinea = tononkira.split("\n").length - 1;
      let decomp = decom(tononkira_feno);
      decomp.map((value, index_j) => {
        data_vaovao.push({
          andininy: data.andininy,
          // order: index_i + index_j,
          tononkira: value,
          fiverenany: false,
        });
      });
    });
    return data_vaovao;
  };
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
                <div style={{ fontSize: 100 }}>
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
