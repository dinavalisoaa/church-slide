import {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { RevealHandle, RevealSlides } from "../Reveal.js";
import { BiLogoGithub } from "react-icons/bi";
import HoverEffect from "hover-effect";
// import { CSSProperties, forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";

import "../App.css";
import Reveal from "../reveal.js";
import Andininy from "./Andininy.js";

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

interface HoverEffectHandle {
  next: () => void;
  previous: () => void;
  destroy: () => void;
}

const liquidImage = ({
  id,
  ...options
}: { id: string } & LiquidImageOptions) => {
  return new HoverEffect({
    parent: document.getElementById(id) as HTMLElement,
    ...options,
  });
};
const LiquidImage = forwardRef<
  HoverEffectHandle,
  { id: string; init: boolean } & LiquidImageOptions
>(
  (
    {
      id,
      init,
      ...options
    }: { id: string; init: boolean } & LiquidImageOptions,
    ref
  ) => {
    const liquidImageRef = useRef<HoverEffect | null>(null);

    const optionsString = JSON.stringify(options);

    liquidImageRef.current = useMemo(() => {
      const options = JSON.parse(optionsString);
      if (liquidImageRef.current !== null) {
        liquidImageRef.current.destroy();
      }
      if (init) {
        return liquidImage({ id, ...options });
      }
      return null;
    }, [id, optionsString, init]);

    useImperativeHandle(ref, () => ({
      next: () => {
        if (liquidImageRef.current !== null) {
          liquidImageRef.current.next();
        } else {
          console.log("LiquidImage not initialized");
        }
      },
      previous: () => {
        if (liquidImageRef.current !== null) {
          liquidImageRef.current.previous();
        } else {
          console.log("LiquidImage not initialized");
        }
      },
      destroy: () => {
        if (liquidImageRef.current !== null) {
          liquidImageRef.current.destroy();
        } else {
          console.log("LiquidImage not initialized");
        }
      },
    }));

    return <></>;
  }
);

function Affiche(props) {
  const [data, setData] = useState([]);
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance
  useEffect(() => {}, []);
  const liquidImageRef2 = useRef<HoverEffectHandle>(null);

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
export default Affiche;
