import React, { useState, useEffect } from "react";
import "../style/dailymanga.css";
import { Link } from "react-router-dom";
import {  useParams } from "react-router-dom";

const UpdatedTitleWrapper = () => {
  const [mangaInfo, setMangaDataState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useParams();

  console.log(mangaInfo);

  // Declare an array to hold the manga data

  const getAllMangaInfo = async () => {
    try {
      const response = await fetch("/executeQuery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sql: `exec spSearchManga @mangatitle='${searchTerm}'`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      if (data.success) {
        setMangaDataState(data.rows); // Set the manga data array
        console.log("Retrieved data:", data.rows);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMangaInfo();
  }, []);

  
  return (
    <div className="UpdatedTitles-module_gridContainer_mw8H9 snipcss-zXl4m">
      {mangaInfo.map((manga, index) => (
        <div key={index} className="UpdatedTitle-module_titleWrapper_2EQIT">
          <div className="UpdatedTitle-module_title_2KlMr">
            <img
              alt=""
              className="UpdatedTitle-module_titleImage_3DBmi"
              src={manga.Cover_Image}
            />
            <div className="UpdatedTitle-module_titleDescription_Cf0hO">
              <p className="UpdatedTitle-module_titleName_1QO_s">{manga.title}</p>
              <p className="UpdatedTitle-module_author_1ltec">{manga.author}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdatedTitleWrapper;
