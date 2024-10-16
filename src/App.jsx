import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { generativeReplace } from "@cloudinary/url-gen/actions/effect";
import UploadWidget from "./UploadWidget";
import styles from "./App.module.css";

function App() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [imagenSubida, setImagenSubida] = useState(null);

  const cld = new Cloudinary({ cloud: { cloudName: "arielcloudinary" } });

  useEffect(() => {
    if (uploadResult && uploadResult.success) {
      try {
        const img = cld
          .image(uploadResult.info.public_id)
          .effect(generativeReplace().from("person").to("tower"));
        setImagenSubida(img);
        console.log("Image set with effect:", img);
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }
  }, [uploadResult]);

  return (
    <div className={styles.app}>
      <h1>Cloudinary</h1>
      <UploadWidget onUpload={(result) => setUploadResult(result)} />
      {imagenSubida && (
        <AdvancedImage
          cldImg={imagenSubida}
          onLoad={() => {
            console.log("AdvancedImage onLoad triggered");
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.error("Error loading image:", e);
          }}
          // pendiente agregar algo mientras se carga la imagen
        />
      )}
    </div>
  );
}

export default App;
