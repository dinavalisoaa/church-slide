import {
  useEffect,
  useState,
} from "react";
import HoverEffect from "hover-effect";
// import { CSSProperties, forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';

import "../../App.css";

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



function TransitionPage(props) {
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
              width: "88%",
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
                height: "100%",
                flexDirection: "column",
                padding:"50px"
              }}
            >
              <p style={{ textAlign: "center" }} 
             >
                <span
                  style={{
                    marginLeft: "0.35rem",
                    marginRight: "0.35rem",
                    fontSize: 60,overflowWrap:"anywhere",
                  }}
                >
                 {props.title}
                </span>
              </p>

              <p style={{ textAlign: "center" ,color:"red" }}>
                  <span
                    className="fragment slide-in-then-semi-out"
                    style={{ marginLeft: "0.35rem", marginRight: "0.35rem" ,overflowWrap:"anywhere"}}>
                   {props.description}
                  </span>
                  <span
                    className="fragment fade-in-then-semi-out"
                    style={{ marginLeft: "0.35rem", marginRight: "0.35rem" }}
                  >
                  </span>
                </p>
            </div>
            <div
              style={{
                maxHeight: "75vh",
                maxWidth: "50vh",
                minWidth: "450px",
                minHeight: "300px",
                height: "650px",
                width: "300px",
                marginRight: "3rem",
                borderRadius: "1rem",
              }}
            >
              <img
                src={props.image}
                width={600}
                height={600}
              />
            </div>
          </div>
        </section>

   
      </section>
    </>
  );
}
export default TransitionPage;
