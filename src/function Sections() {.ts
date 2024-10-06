function Sections() {
  const revealRef = useRef<RevealHandle>(null);
  const goToSlide = (indexh: number, indexv: number) => {
    console.log("<<<<<<<<<<<<<<Hello>>>>>>>>>>>>>>");
    console.log("<<<<<<<<<<,,,,>>>>>>>>>>", revealRef);

    if (revealRef.current) {
      revealRef.current.getReveal()?.slide(indexh, indexv, 0);
      console.log("->>>>>>>>>>>>." + revealRef.current.getReveal());
    }
  };
  const [theme, setTheme] = useState("black");
  const [presState, setPresState] = useState({
    indexh: -1,
    indexv: -1,
    indexf: -1,
    paused: false,
    overview: false,
  });
  const [useCustomTheme] = useState(false);
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>(
    "edges"
  );
  const [headerFontColor, setHeaderFontColor] = useState("white");
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [headerVisible, setHeaderVisible] =
    useState<CSSProperties["visibility"]>("hidden");
  const liquidImageRef2 = useRef<HoverEffectHandle>(null);
  const [liquidInit, setLiquidInit] = useState(false);

  const timeDelta = 1000;
  const next = () => {
    console.log(Reveal.slide(3, 0, 0));
  };

  const prevSlide = (indexh, indexv) => {
    if (revealRef.current?.getReveal()?.isFirstSlide() === false) {
      revealRef.current?.getReveal()?.slide(indexh, indexv);
      console.log("Clicked");
    }
  };

  const handleOnStateChange = (state: Reveal.RevealState) => {
    console.log(state);

    if (state.indexh === 0 && state.indexv === 0) {
      setHeaderFontColor("white");
      setHeaderVisible("hidden");
      setHeaderOpacity(0);
    } else if (state.indexh === 0 && state.indexv === 1) {
      setHeaderFontColor("black");
    } else if (state.indexh === 1 && state.indexv === 0 && state.indexf === 0) {
      setHeaderFontColor("white");
      liquidImageRef2.current?.next();
    } else if (state.indexh === 1 && state.indexv === 0 && state.indexf === 1) {
      setHeaderFontColor("white");
      liquidImageRef2.current?.previous();
    } else if (state.indexh > 1) {
      setHeaderFontColor("black");
    } else {
      setHeaderFontColor("white");
    }

    if (!(state.indexh === 0 && state.indexv === 0)) {
      setHeaderVisible("visible");
      setHeaderOpacity(1);
    }
    setLiquidInit(true);
  };

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => {
      setTheme("black");
    }, 3 * timeDelta);

    // const timer2 = setTimeout(() => {
    //   setFirstSlideText("Explore new possibilities thanks to the React framework and ecosystem")
    // }, 6*timeDelta);

    const timer2a = setTimeout(() => {
      setPresState({
        indexh: 0,
        indexv: 1,
        indexf: 0,
        paused: false,
        overview: false,
      });
    }, 9 * timeDelta);

    const timer2b = setTimeout(() => {
      setPresState({
        indexh: 0,
        indexv: 1,
        indexf: 1,
        paused: false,
        overview: false,
      });
    }, 12 * timeDelta);

    const timer2c = setTimeout(() => {
      setPresState({
        indexh: 0,
        indexv: 1,
        indexf: 2,
        paused: false,
        overview: false,
      });
    }, 15 * timeDelta);

    // const timer3 = setTimeout(() => {
    //   setTheme("white")
    // }, 9*timeDelta);

    // const timer4 = setTimeout(() => {
    //   setPresState({"indexh": 1, "indexv": 0, "indexf": 0, "paused": true, "overview": false });
    // }, 12*timeDelta);

    // const timer5 = setTimeout(() => {
    //   setUseCustomTheme(true);
    // }, 15*timeDelta);

    // const timer6 = setTimeout(() => {
    //   setControlsLayout("bottom-right");
    // }, 18*timeDelta);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2a);
      clearTimeout(timer2b);
      clearTimeout(timer2c);
      // clearTimeout(timer3)
      // clearTimeout(timer4)
      // clearTimeout(timer5)
      // clearTimeout(timer6)
    };
  }, []);

  console.log("PresState: ", presState);

  return (
    <>
      
      
        {/* <div
          style={{
            width: "62vw",
            minHeight: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              color: headerFontColor,
              transition: "color 1.2s ease-in-out",
            }}
          >
            react-reveal-slides
          </h3>
          <a
            href="https://github.com/bouzidanas/react-reveal-slides"
            target="_blank"
            rel="noreferrer"
          >
            <BiLogoGithub
              style={{
                color: headerFontColor,
                fontSize: "2.5rem",
                transition: "color 1.2s ease-in-out",
              }}
            />
          </a>
        </div>
         */}
      <RevealSlides
        key="rs-2"
        scrollSnap="mandatory"
        overview={true}
        minScale={1}
        view="scroll"
        maxScale={1}
        transition="fade"
        width={"100%"}
        margin={0.01}
        controlsLayout={controlsLayout}
        presState={presState}
        plugins={[RevealZoom, RevealNotes]}
        theme={theme}
        onStateChange={handleOnStateChange}
        ref={revealRef}
      >
        <section key="133" data-transition="fade-in fade-out">
          <section key={1}>
            <div style={{ fontSize: 70 }}>
              <p>1. Efa namangy ny olony Jeso</p> <p> ‘zay Tompon’ny aina</p>{" "}
              <p> ‘ Lasa ny alina maizina</p>
              <p> :,: Tonga indray ny maraina !:,:</p>
              <p>
                   <Link to="/about">Go to About Page</Link>

              </p>
            </div>
          </section>

          <section key={2}>
            <div style={{ fontSize: 70 }}>
              <p>222222222 1. Efa namangy ny olony Jeso</p>{" "}
              <p> ‘zay Tompon’ny aina</p> <p> ‘ Lasa ny alina maizina</p>
              <p> :,: Tonga indray ny maraina !:,:</p>
            </div>
          </section>

          <section key={3}>
            <div style={{ fontSize: 70 }}>
              <p>3 . Efa namangy ny olony Jeso</p> <p> ‘zay Tompon’ny aina</p>{" "}
              <p> ‘ Lasa ny alina maizina</p>
              <p> :,: Tonga indray ny maraina !:,:</p>
            </div>
          </section>
        </section>
        <section key="100" data-transition="fade-in fade-out">
          <section key={1}>
            <div style={{ fontSize: 70 }}>
              <p>100. Efa namangy ny olony Jeso</p> <p> ‘zay Tompon’ny aina</p>{" "}
              <p> ‘ Lasa ny alina maizina</p>
              <p> :,: Tonga indray ny maraina !:,:</p>
            </div>
          </section>

          <section key={2}>
            <div style={{ fontSize: 70 }}>
              <p>1002 1. Efa namangy ny olony Jeso</p>{" "}
              <p> ‘zay Tompon’ny aina</p> <p> ‘ Lasa ny alina maizina</p>
              <p> :,: Tonga indray ny maraina !:,:</p>
            </div>
          </section>

          <section key={3}>
            <div style={{ fontSize: 70 }}>
              <p>100. Efa namangy ny olony Jeso</p> <p> ‘zay Tompon’ny aina</p>{" "}
              <p> ‘ Lasa ny alina maizina</p>
              <p> :,: Tonga indray ny maraina !:,:</p>
            </div>
          </section>
        </section>
        {useCustomTheme && (
          <link rel="stylesheet" href="/custom_theme_starter.css" />
        )}
      </RevealSlides>
    </>
  );
}

function RouterComponent() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/sections" element={<Sections />} />
                  <Route path="/" element={<App />} />
                  
              </Routes>
          </div>
      </Router>
  );
}