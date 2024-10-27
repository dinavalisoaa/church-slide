import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

function SlideForm() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const greet = async () => {
 
    const json = {
      amount: 1234,
      verification: 24.3,
      published_at: "2022-02-20",
      title: "Jim Cliff",
      text: "Camea",
    };
    const param = {
      page: 1,
      posts_per_page: 23,
    };
    const result = await invoke("list_posts", {
      params: param,
    }).then((response) => setList(response));
    
  };
  const get_test = async () => {
    greet();
  };

  return (
    <>
      <div
        style={{
          fontFamily: "Helvetica",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            maxWidth: "43rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4 style={{ color: "#f17a52" }}>asdkald</h4>
          <button onClick={() => get_test()}>Aller à la section 1-1</button>
          {list.map((element) => (
            <p>{element.title}</p>
          ))}
          <p style={{ textAlign: "left" }}>
            <span
              className="fragment fade-in-then-semi-out"
              style={{ marginLeft: "0.35rem", marginRight: "0.35rem" }}
            >
              {text}
              This package makes no efforts to impead or restrict what you can
              or cannot do.
            </span>
            <span
              className="fragment fade-in-then-semi-out"
              style={{ marginLeft: "0.35rem", marginRight: "0.35rem" }}
            >
              You can still add javascript in the usual ways inside and outside
              the React framework.
            </span>
            <span
              className="fragment fade-in-then-semi-out"
              style={{ marginLeft: "0.35rem", marginRight: "0.35rem" }}
            >
              And the same goes for styling.
            </span>
          </p>
        </div>
        <div
          id="liquid-image2"
          style={{
            maxHeight: "75vh",
            maxWidth: "50vh",
            minWidth: "200px",
            minHeight: "300px",
            height: "450px",
            width: "300px",
            marginRight: "3rem",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          {/* <LiquidImage
                    ref={liquidImageRef2}
                    init={liquidInit}
                    id="liquid-image2"
                    intensity={0.2}
                    imagesRatio={1.5}
                    image1="/black-notebook.jpg"
                    image2="/notebook-and-pen.jpg"
                    displacementImage="/heightMap.png"
                    hover={false}
                  /> */}
        </div>
      </div>
    </>
  );
}
export default SlideForm;
