import { Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getCategoriesAPI,
  getCategoriesOneAndTwoAPI,
} from "../../../apis/reportAPI";

export default function ProjectLibraryItem({
  index,
  projectLibraryItems,
  detail = {},
  categoryOneTwo,
  onChange = () => {},
  onRemove = () => {},
}) {
  const [categoryOne, setCategoryOne] = useState([]);
  const [inputValue, setInputValue] = useState(
    detail?.fileName || detail?.linkLibrary
  );
  const [categoryTwo, setCategoryTwo] = useState([]);
  const [linkLibrary, setLinkLibrary] = useState([]);
  // const [selectedCategoryOne, setSelectedCategoryOne] = useState("");
  // const [selectedCategoryTwo, setSelectedCategoryTwo] = useState("");
  const [errorCategoryOne, setErrorCategoryOne] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorCategoryTwo, setErrorCategoryTwo] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorLibary, setErrorLibrary] = useState("");
  console.log(detail);
  useEffect(() => {
    if (detail.categoryOne) {
      setErrorCategoryOne("");
    }
    if (detail.categoryTwo) {
      setErrorCategoryTwo("");
    }
    const selectedCategoryOne = categoryOneTwo.filter(
      (category) => category.name === detail.categoryOne
    );
    setCategoryTwo(selectedCategoryOne[0].categories);
    // setInputValue(detail?.fileName || detail?.linkLibrary);
  }, []);

  const handleSelectCategoryOne = (id, key, value) => {
    // debugger;
    onChange({
      ...detail,
      categoryOne: value,
      // linkLibrary: "",
    });
    if (value) {
      const selectedCategoryOne = categoryOneTwo.filter(
        (category) => category.name === value
      );
      setCategoryTwo(selectedCategoryOne[0].categories);

      for (const item of projectLibraryItems) {
        if (
          value === item.categoryOne &&
          selectedCategoryOne[0].categories.length === 0
        ) {
          return setErrorCategoryOne("Danh mục đã tồn tại");
        }
      }
      setErrorCategoryOne("");
    } else {
      setErrorCategoryOne("Vui lòng không bỏ trống");
    }
  };
  const handleInputChange = (id, key, value) => {
    // debugger;
    if (key === "categoryTwo") {
      onChange({
        ...detail,
        categoryTwo: value,
      });
      if (value) {
        for (const item of projectLibraryItems) {
          if (value === item.categoryTwo) {
            return setErrorCategoryTwo("Danh mục đã tồn tại");
          }
        }
        setErrorCategoryTwo("");
        // setSelectedCategoryTwo(value);
      } else {
        setErrorCategoryTwo("Vui lòng không bỏ trống");
      }
    } else if (key === "linkLibrary") {
      setInputValue(value);
      setErrorLibrary("");
      setLinkLibrary(value);
      onChange({
        ...detail,
        linkLibrary: value,
        file: [],
      });
    }
  };

  const handleFileChange = (e, id) => {
    const chosenFiles = [...e.target.files];

    let chosenfileName = chosenFiles.map((file) => file.name);
    // console.log(fileName.join(";"));
    setInputValue(chosenfileName.join(";"));
    onChange({
      ...detail,
      files: chosenFiles,
      fileName: chosenfileName.join(";"),
    });
  };

  const deleteDiv = async (id) => {
    debugger;
    try {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa? ",
        text: "Hạng mục này sẽ bị xóa vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa hạng mục",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        Swal.fire({
          title: "Đã xóa!",
          text: "Hạng mục đã được xóa thành công.",
          icon: "success",
        });
        onRemove(detail);
      }
    } catch (error) {}
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <b>{index + 1}.</b>
      <div
        style={{
          // justifyContent: "start",
          maxWidth: "800px",
          marginBottom: "15px",
          padding: "10px 20px",
          // borderRadius: "5px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div
            // className=" me-4"
            style={{
              // height: "50px",
              marginBottom: "5px",
              width: "290px",
            }}
          >
            <Autocomplete
              size="small"
              sx={{
                display: "block",
              }}
              value={detail.categoryOne}
              options={categoryOneTwo?.map((option) => option.name)}
              onChange={(e, value) =>
                handleSelectCategoryOne(detail.id, "categoryOne", value)
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Danh mục 1" />
              )}
            />
            <span className="text-danger  ">{errorCategoryOne}</span>
          </div>
          {detail.categoryOne === detail.categoryTwo ? (
            <></>
          ) : categoryTwo?.length > 0 || detail?.categoryTwo !== "" ? (
            <div style={{ width: "290px" }}>
              <Autocomplete
                size="small"
                sx={{
                  display: "block",
                  height: "40px",
                }}
                disablePortal
                value={detail?.categoryTwo}
                options={categoryTwo?.map((option) => option.name)}
                onChange={(e, value) =>
                  handleInputChange(detail.id, "categoryTwo", value)
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="Danh mục 2" />
                )}
              />
              <span className="text-danger ">{errorCategoryTwo}</span>
            </div>
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "600px" }}>
            <TextField
              placeholder="Nội dung"
              value={inputValue}
              title={inputValue}
              size="small"
              sx={{
                width: "100%",
              }}
              onChange={(e) =>
                handleInputChange(detail.id, "linkLibrary", e.target.value)
              }
            />
            <span className="text-danger ">{}</span>
          </div>
          <div
            style={{
              display: "flex",
              paddingTop: "7px",
              marginLeft: "20px",
            }}
          >
            <input
              type="file"
              style={{ width: "110px" }}
              className="custom-file-input "
              name="filename"
              multiple
              onChange={(e) => handleFileChange(e, detail.id)}
            />

            <button
              style={{
                width: "30px",
                height: "30px",
                padding: 0,
              }}
              type="button"
              className="btn btn-danger"
              onClick={() => deleteDiv(detail.id)}
            >
              <ClearIcon sx={{ fontSize: "20px", fontWeight: "bold" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  console.log("🚀 ~ detail:", detail);
  console.log("🚀 ~ detail:", detail);
  console.log("🚀 ~ detail:", detail);
}
