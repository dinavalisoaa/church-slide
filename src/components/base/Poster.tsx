import {
  useEffect,
  useState,
} from "react";
// import { CSSProperties, forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';

import "../../App.css";




function Poster(props) {
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  const [liquidInit, setLiquidInit] = useState(false);

  return (
    <>
      <section key={props.key}>
        <section key={1} style={{ backgroundImage: props.image }} data-background-color="#dedede">
          {/* <div style={{ fontSize: 100 }}>{props.title}</div> */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection:"row",
              marginTop: "2.5rem",
              justifyContent: "flex-end",
              grid: "inherit",
              
            }}
          >
            <div
              style={{
                maxHeight: "105vh",
                maxWidth: "65vh",
                minWidth: "100%",
                minHeight: "300px",
                height: "600px",
                width: "300px",
                borderRadius: "1rem",
              }}
            >
              <img
                src={props.image}
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
export default Poster;
