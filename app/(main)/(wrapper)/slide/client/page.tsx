"use client";
import React, { useEffect, useRef, useState } from "react";
import { RevealHandle, RevealSlides } from "../../../../Reveal";


import Song from "@/components/new-features/song";
import dynamic from "next/dynamic";
import ImageHolder from "@/components/new-features/image-holder";
import TransitionPage from "@/components/new-features/transition-page";

function Slide() {

    const RevealZoom = dynamic(
        () => import('reveal.js/plugin/zoom/zoom'),
        { ssr: false }
    );

    const Simplemenu = dynamic(
        () => import('reveal.js-simplemenu/plugin/simplemenu/simplemenu'),
        { ssr: false }
    );
    const RevealNotes = dynamic(
        () => import('reveal.js/plugin/notes/notes'),
        { ssr: false }
    );
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
                margin={0.01}
                plugins={[RevealZoom, RevealNotes, Simplemenu]}
                controlsLayout={controlsLayout}
                presState={presState}
                theme={theme}
                ref={revealRef}
                simplemenu={{
                    menuclass: "menu",
                    activeclass: "active",
                    activeelement: "li",
                    selectby: "id",
                    barhtml: {
                        header: "",
                        footer: ""
                    },
                    flat: false,
                    scale: 0.67,
                    csspath: ""
                }}
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
                <ImageHolder key={""} andininy={""} hira={""} title={"Raharahampiangonana"} />

                <Song
                    hira={"ffpm_" + "133"}
                    key={1}
                    andininy={null}
                    title={"FFPM " + "133"}
                />
<TransitionPage key={""} image={"../ressources/images/hira.jpg"} title={"Break kely"} description={"Break kely"} />
                <Song
                    hira={"ffpm_" + "325"}
                    key={325}
                    title={"FFPM " + "325"}
                    andininy={null}
                />

                <Song
                    hira={"ffpm_" + "813"}
                    key={813}
                    title={"FFPM " + "813"}
                    andininy={null}
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
