import {useEffect} from "react";

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';

function ImageHolder(props: {
    andininy: string | null;
    hira: string;
    key: string | number | undefined;
    title: string | null;
}) {

    useEffect(() => {
    }, []);

    return (
        <>
            <section key={props.key + "45"} >
                <section key={props.key + "78"}>
                    <div className="container bg-red-100 flex" style={{height: '1050px'}}>
                        <div className="bg-blue-400 w-1/3"><img src='../ressources/images/batisa.png'/></div>
                        <div className="bg-blue-500 w-1/3"><h4>Caption</h4></div>
                        <div className="bg-blue-100 w-1/3mm"><h4>2025-2052</h4></div>
                    </div>
                </section>
            </section>
        </>
    );
}

export default ImageHolder;
