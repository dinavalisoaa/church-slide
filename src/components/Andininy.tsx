import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { RevealHandle, RevealSlides } from "./Reveal";
import { BiLogoGithub } from "react-icons/bi";

import "../App.css";

function Andininy(props) {
  const data = props.data;
  const and = props.and;
  // const data_plot = data.split("\n");
  const return_values = data.map((element, index) => {
    return <p>{element}</p>;
  });
  return return_values;
}
export default Andininy;
