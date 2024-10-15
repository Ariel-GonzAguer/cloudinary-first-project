import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

// cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";

import { generativeReplace } from "@cloudinary/url-gen/actions/effect";

function App() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cld = new Cloudinary({ cloud: { cloudName: "arielcloudinary" } });

  let otroGato;

  try {
    otroGato = cld
      .image("samples/animals/reindeer")
      .effect(generativeReplace().from("reindeer").to("two red cats"));
  } catch (err) {
    setError(err.message);
  }

  useEffect(() => {
    console.log(otroGato.toURL());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <h1>Cloudinary</h1>

        <div className={styles.cloudinaryDiv}>
          <AdvancedImage
            cldImg={otroGato}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
          {!imageLoaded && <p>Loading...</p>}
        </div>
        <p>Something</p>
      </div>
    </>
  );
}

export default App;
