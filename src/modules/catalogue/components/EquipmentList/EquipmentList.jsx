import React from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const handleSearch = () => {};
export default function EquipmentList({ list }) {
  const listEquipments = list;
  const navigate = useNavigate();
  const navigateEquipment = (item) => {
    navigate(`/catalogue/${item.code}`);
  };

  return (
    <>
      <div className="d-flex justify-content-center m-3">
        <div className="input-group  w-50 ">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm thiết bị..."
            aria-label="Tìm kiếm thiết bị..."
            aria-describedby="basic-addon2"
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table striped bordered hover variant="" style={{ fontSize: "13px" }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>TÊN THIẾT BỊ</th>
            <th>MÃ THIẾT BỊ</th>
            <th>THI CÔNG DỰ ÁN</th>
            <th>NẰM Ở KHO BÃI</th>
            <th> GHI CHÚ </th>
          </tr>
        </thead>
        <tbody>
          {listEquipments.map((item, index) => (
            <tr
              key={index}
              onClick={() => {
                navigateEquipment(item);
              }}
              style={{ cursor: "pointer" }}
            >
              <td style={{ width: "5%" }}>{item.number}</td>
              <td style={{ width: "35%" }}>{item.name}</td>
              <td style={{ width: "15%" }}>{item.code}</td>
              <td style={{ width: "15%" }}>{item.construction}</td>
              <td style={{ width: "20%" }}>{item.location}</td>
              <td style={{ width: "10%" }}>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
