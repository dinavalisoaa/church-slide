import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Song from "./components/base/Song";



import "./App.css";
import OriginalPage from "./components/OriginalPage";
import Slide from "./components/base/Slide";

// import './custom_theme_starter.css';


const showIntro = false;

/*
const Presentation = () => {
  // Fonction pour aller directement à une section spécifique
  // const goToSlide = (horizontalIndex, verticalIndex) => {
  //   Reveal.slide(horizontalIndex, verticalIndex);
  // };
  const goToSlide = (horizontalIndex, verticalIndex) => {
    if (Reveal.isReady()) {
      Reveal.slide(horizontalIndex, verticalIndex);
    }
  };

  // useEffect pour initialiser Reveal.js après le montage du composant
  useEffect(() => {
    Reveal.initialize({
      controls: true,
      plugins: [RevealZoom, RevealNotes],
    });
  }, []); // Ce hook ne sera exécuté qu'une seule fois au montage du composant

  return (
    <RevealSlides
      controls={true}
      plugins={[RevealZoom, RevealNotes]}
      onStateChange={(state) => console.log(state)}
    >
      <section key="0" data-background-color="#0c1821">
        <section key="0-0">
          <button onClick={() => goToSlide(1, 1)}>
            Aller à la section 1-1
          </button>
          <h2>react-reveal-slides</h2>
          <p>Create dynamic Reveal.js slides</p>
        </section>
        <section key="0-1">
          <ul>
            <li className="fragment">
              Easily make presentation content dynamic
            </li>
            <li className="fragment">Easily add presentations to React apps</li>
            <li className="fragment">
              Embed React components inside presentations
            </li>
          </ul>
        </section>
      </section>
      <section key="1" data-background-color="#bf4f41">
        <section key="1-0">
          <h2>Free reign over your presentation</h2>
          <p>
            This package makes no efforts to impead or restrict what you can do.
          </p>
        </section>
        <section key="1-1">
          <p>
            Since React creates HTML DOM elements out of JSX, there should be no
            reason we cant just put JSX inside of our RevealSlides component
            instead of the HTML markup Reveal.js normally expects.
          </p>
        </section>
        <section key="1-2">
          <p>
            Simply put, React already takes care of converting JSX into
            something Reveal.js can work with.
          </p>
          <aside className="notes">Shhh, these are your private notes 📝</aside>
        </section>
      </section>
    </RevealSlides>
  );
};

function ProgramPage() {}*/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slide />} />
        <Route
          path="/simple"
          element={<Song hira="ffpm_635" key="1" title="FFPM 635" />}
        />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/original" element={<OriginalPage />} />
      </Routes>
    </Router>
  );
}
export default App;
