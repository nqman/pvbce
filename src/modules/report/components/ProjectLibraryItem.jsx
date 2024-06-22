import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getCategoriesAPI,
  getCategoriesOneAndTwoAPI,
} from "../../../apis/reportAPI";

export default function ProjectLibraryItem({
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
  const [selectedCategoryOne, setSelectedCategoryOne] = useState("");
  const [selectedCategoryTwo, setSelectedCategoryTwo] = useState("");
  const [errorCategoryOne, setErrorCategoryOne] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorCategoryTwo, setErrorCategoryTwo] = useState(
    "Vui lòng không bỏ trống"
  );
  const [errorLibary, setErrorLibrary] = useState("");

  useEffect(() => {
    if (detail.categoryOne) {
      setErrorCategoryOne("");
    }
    if (detail.categoryTwo) {
      setErrorCategoryTwo("");
    }
    // setInputValue(detail?.fileName || detail?.linkLibrary);
  }, [detail]);

  const handleSelectCategoryOne = (id, key, value) => {
    // debugger;
    if (value) {
      setErrorCategoryOne("");
      setSelectedCategoryOne(value);
      let selectedCategory = categoryOneTwo.filter(
        (category) => category.name === value
      );
      setCategoryTwo(selectedCategory[0].categories);
      onChange({
        ...detail,
        categoryOne: value,
        linkLibrary: "",
      });
    } else {
      setErrorCategoryOne("Vui lòng không bỏ trống");
    }
  };
  const handleInputChange = (id, key, value) => {
    debugger;
    if (key === "categoryTwo") {
      if (value) {
        setErrorCategoryTwo("");
        setSelectedCategoryTwo(value);
        onChange({
          ...detail,
          categoryTwo: value,
        });
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
    <div data-cc="root">
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginBottom: "5px",
        }}
      >
        <div
          className=" me-4 mb-2"
          style={{
            height: "50px",
            width: "300px",
          }}
        >
          <Autocomplete
            size="small"
            sx={{
              display: "block",
              height: "40px",
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
        {categoryTwo?.length > 0 || detail?.categoryTwo ? (
          <div className=" me-4" style={{ height: "50px", width: "300px" }}>
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
        <div className=" me-4" style={{ height: "50px", width: "300px" }}>
          <TextField
            placeholder="Nội dung"
            // value={detail?.fileName || detail?.linkLibrary}
            // title={detail?.fileName || detail?.linkLibrary}
            value={inputValue}
            title={inputValue}
            size="small"
            sx={{
              height: "40px",
              width: "100%",
              marginBottom: "5px",
            }}
            onChange={(e) =>
              handleInputChange(detail.id, "linkLibrary", e.target.value)
            }
          />
          <span className="text-danger ">{}</span>
        </div>
        <div
          style={{
            height: "50px",
            display: "flex",
            paddingTop: "7px",
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
  );
}
