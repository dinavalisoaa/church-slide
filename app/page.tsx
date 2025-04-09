import Image from 'next/image'
import Link from 'next/link'
"use client";
import {useEffect, useRef, useState} from "react";
import {RevealHandle, RevealSlides} from "@/app/Reveal";
import dynamic from 'next/dynamic';
import {Simplemenu} from  'reveal.js-simplemenu/plugin/simplemenu/simplemenu';
import {useRouter} from "next/navigation";
export default function Home() {
    useEffect(() => {}, []);

    const RevealZoom = dynamic(
        () => import('reveal.js/plugin/zoom/zoom'),
        { ssr: false }
    );

    const RevealNotes = dynamic(
        () => import('reveal.js/plugin/notes/notes'),
        { ssr: false }
    );
    const revealRef = useRef<RevealHandle>(null);

    const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>(
        "bottom-right"
    );
    const router =useRouter();
    const [theme] = useState("moon");
    const [presState] = useState({
        indexh: -1,
        indexv: -1,
        indexf: -1,
        paused: false,
        overview: false,
    });
    const reload = (url:string) =>{
        router.push(url);
    }
    return (
        <RevealSlides
            key="rs-2"
            scrollSnap="mandatory"
            backgroundTransition="convex"
            minScale={1}
            maxScale={1}
            transition="concave"
            margin={0.01}
            plugins={[RevealZoom, RevealNotes]}
            controlsLayout={controlsLayout}
            presState={presState}
            theme={theme}
            ref={revealRef}
            controls>
            <section key="0" data-background-color="#0c1821">
                <section key="0-0">
                    <div className="container bg-red-200 w-[300%] h-[300%] mr-200">
                        <div style={{fontSize: 80}}>312312</div>
                        <div className="bg-blue-400 ml-200">Logo</div>
                        <p></p>
                        <button onClick={() => reload("/admin/list")}>Admin list</button>
                        <p>
                            <button onClick={() => reload("/admin/form/ui/manefo")}>Manefo</button>
                        </p>
                        <p>
                            <button onClick={() => reload("/admin/nl")}>NL</button>
                        </p>
                        <p>
                            <button onClick={() => reload("/admin/song-category")}>Categories</button>
                        </p>
                        <div>Caption</div>
                    </div>
                </section>
                <section key="0-1">
                    <ul>
                        <li className="fragment">Easily make presentation content dynamic</li>
                        <li className="fragment">Easily add presentations to React apps</li>
                        <li className="fragment">Embed React components inside presentations</li>
                    </ul>
                </section>
            </section>
            <section key="1" data-background-color='#bf4f41'>
                <section key="1-0">
                    <h2>Free reign over your presentation</h2>
                    <p>This package makes no efforts to impead or restrict what you can do.</p>
                </section>
                <section key="1-1">
                    <p>Since React creates HTML DOM elements out of JSX, there should be no reason we cant just put JSX
                        inside of our RevealSlides component instead of the HTML markup Reveal.js normally expects.</p>
                </section>
                <section key="1-2">
                    <p><b className="size-10">Simply</b> put, React already takes care of converting JSX into something Reveal.js can work
                        with.put, React already takes care of converting JSX into something Reveal.js can work
                        with.put, React already takes care of converting JSX into something Reveal.js can work
                        with.put, React already takes care of converting JSX into something Reveal.js can work
                        with.</p>
                    <aside className="notes">Shhh, these are your private notes 📝</aside>
                </section>
            </section>
        </RevealSlides>
    )
}
