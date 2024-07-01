import baseAPI from "./baseAPI";

//Lấy danh sách các nhân sự
export async function listEmployeesAPI() {
  try {
    const resp = await baseAPI.get("employees");
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Thêm nhân sự
export async function saveEmployeeAPI(employee) {
  // console.log(employee);

  // debugger;
  try {
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("code", employee.code);
    formData.append("department", employee.department);
    formData.append("position", employee.position);
    formData.append("method", employee.method);
    formData.append("contact", employee.contact);
    // EDIT
    if (employee.id > 0) {
      if (employee.IDCard) {
        formData.append("partID", employee.IDCard);
      } else {
        formData.append("pathID", employee.pathID);
      }

      if (employee.degree) {
        formData.append("partDegree", employee.degree);
      } else {
        formData.append("pathDegree", employee.pathDegree);
      }

      if (employee.safetyCard) {
        formData.append("partSafetyCard", employee.safetyCard);
      } else {
        formData.append("pathSafetyCard", employee.pathSafetyCard);
      }

      if (employee.contract) {
        formData.append("partContract", employee.contract);
      } else {
        formData.append("pathContract", employee.pathContract);
      }

      if (employee.healthCer) {
        formData.append("partHealthCer", employee.healthCer);
      } else {
        formData.append("pathHealthCer", employee.pathHealthCer);
      }
    }
    // NEW
    else {
      formData.append("partID", employee.IDCard);
      formData.append("partDegree", employee.degree);
      formData.append("partSafetyCard", employee.safetyCard);
      formData.append("partContract", employee.contract);
      formData.append("partHealthCer", employee.healthCer);
    }
    // console.log(formData);
    const resp = await baseAPI.post("employees/save", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw error.response;
    }
    throw error.message;
  }
}
export async function selectEmployeeAPI(id) {
  try {
    const resp = await baseAPI.get(`employees/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteEmployeeAPI(id) {
  try {
    const resp = await baseAPI.get(`employees/delete/${id}`);
    return resp.data;
  } catch (error) {
    throw error.response.data;
  }
}

//PDF
export async function fetchPdfEmployee(id, tab) {
  try {
    const response = await baseAPI.get(`employees/url/${tab}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
}
//check trùng mã nhân sự
export async function checkCodeAPI(code) {
  try {
    // console.log(valueOfEmail);

    const resp = await baseAPI.get(`employees/validate/code/${code}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
