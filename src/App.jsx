import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { generativeBackgroundReplace, generativeReplace } from "@cloudinary/url-gen/actions/effect";
import UploadWidget from "./UploadWidget";
import styles from "./App.module.css";
import giphy_loading from "/giphy_loading.webp"; // Imagen de espera

function App() {
  const [uploadResultFire, setUploadResultFire] = useState(null);
  const [imageLoadedFire, setImageLoadedFire] = useState(null);
  const [imageReadyFire, setImageReadyFire] = useState(false);

  const [uploadResultZombies, setUploadResultZombies] = useState(null);
  const [imageLoadedZombies, setImageLoadedZombies] = useState(null);
  const [imageReadyZombies, setImageReadyZombies] = useState(false);

  const [uploadResultSkull, setUploadResultSkull] = useState(null);
  const [imageLoadedSkull, setImageLoadedSkull] = useState(null);
  const [imageReadySkull, setImageReadySkull] = useState(false);

  const [imagesResults, setImagesResults] = useState({
    fire: null,
    zombies: null,
    skull: null,
  });

  const cld = new Cloudinary({ cloud: { cloudName: "arielcloudinary" } });

  // fuego
  useEffect(() => {
    if (uploadResultFire && uploadResultFire.success) {
      try {
        const img = cld
          .image(uploadResultFire.info.public_id)
          .effect(generativeBackgroundReplace().prompt("fire and flames"))
          .resize(scale().width(500));
        setImageLoadedFire(img);
        setImageReadyFire(false); // Reset imageReady to false while loading
        setImagesResults((prev) => ({ ...prev, fire: img.toURL() }));
        console.log("Image set with effect:", img.toURL());
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }
  }, [uploadResultFire]);

  // zombies
  useEffect(() => {
    if (uploadResultZombies && uploadResultZombies.success) {
      try {
        const img = cld
          .image(uploadResultZombies.info.public_id)
          .effect(generativeBackgroundReplace().prompt("death zombies and monsters"))
          .resize(scale().width(500));
        setImageLoadedZombies(img);
        setImageReadyZombies(false); // Reset imageReady to false while loading
        setImagesResults((prev) => ({ ...prev, zombies: img.toURL() }));
        console.log("Image set with effect:", img.toURL());
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }
  }, [uploadResultZombies]);

  // skull
  useEffect(() => {
    if (uploadResultSkull && uploadResultSkull.success) {
      try {
        const img = cld
          .image(uploadResultSkull.info.public_id)
          .effect(generativeReplace().from("face").to("skull"))
          .resize(scale().width(500));
        setImageLoadedSkull(img);
        setImageReadySkull(false); // Reset imageReady to false while loading
        setImagesResults((prev) => ({ ...prev, skull: img.toURL() }));
        console.log("Image set with effect:", img.toURL());
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }
  }, [uploadResultSkull]);

  useEffect(() => {
    console.log(imagesResults);
  }, [imagesResults]);

  return (
    <div className={styles.app}>
      <h1>Cloudinary</h1>
      {/* fire */}
      <div>
        <h2>Fire Background</h2>
        <UploadWidget onUpload={(result) => setUploadResultFire(result)} />
        {imageLoadedFire && !imageReadyFire && (
          <img src={giphy_loading} alt="loading" style={{ width: "500px" }} /> // Imagen de espera
        )}
        {imageLoadedFire && (
          <AdvancedImage
            cldImg={imageLoadedFire}
            onLoad={() => {
              console.log("AdvancedImage onLoad triggered");
              setImageReadyFire(true); // Actualizar el estado cuando la imagen de Cloudinary esté lista
            }}
            onError={(e) => {
              console.error("Error loading image:", e);
              alert("Error applying effect. Please try again with a different image.");
            }}
            style={{ display: imageReadyFire ? "block" : "none" }} // Mostrar solo cuando esté lista
          />
        )}
      </div>

      {/* zombies */}
      <div>
        <h2>Zombies Background</h2>
        <UploadWidget onUpload={(result) => setUploadResultZombies(result)} />
        {imageLoadedZombies && !imageReadyZombies && (
          <img src={giphy_loading} alt="loading" style={{ width: "500px" }} /> // Imagen de espera
        )}
        {imageLoadedZombies && (
          <AdvancedImage
            cldImg={imageLoadedZombies}
            onLoad={() => {
              console.log("AdvancedImage onLoad triggered");
              setImageReadyZombies(true); // Actualizar el estado cuando la imagen de Cloudinary esté lista
            }}
            onError={(e) => {
              console.error("Error loading image:", e);
            }}
            style={{ display: imageReadyZombies ? "block" : "none" }} // Mostrar solo cuando esté lista
          />
        )}
      </div>

      {/* skull */}
      <div>
        <h2>Skull Face</h2>
        <UploadWidget onUpload={(result) => setUploadResultSkull(result)} />
        {imageLoadedSkull && !imageReadySkull && (
          <img src={giphy_loading} alt="loading" style={{ width: "500px" }} /> // Imagen de espera
        )}
        {imageLoadedSkull && (
          <AdvancedImage
            cldImg={imageLoadedSkull}
            onLoad={() => {
              console.log("AdvancedImage onLoad triggered");
              setImageReadySkull(true); // Actualizar el estado cuando la imagen de Cloudinary esté lista
            }}
            onError={(e) => {
              console.error("Error loading image:", e);
            }}
            style={{ display: imageReadySkull ? "block" : "none" }} // Mostrar solo cuando esté lista
          />
        )}
      </div>

      <div>Test url from state array</div>
      <img src={imagesResults.fire} alt="Fire Effect" />
      <img src={imagesResults.skull} alt="Skull Effect" />
      <img src={imagesResults.zombies} alt="Zombies Effect" />
    </div>
  );
}

export default App;
