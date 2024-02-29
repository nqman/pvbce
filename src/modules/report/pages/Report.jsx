import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectManagement from "../components/ProjectManagement";
import { Container } from "@mui/material";

export default function Report() {
  // const navigate = useNavigate();
  return (
    <div>
      <Container>
        <div className="text-end mt-3">
          {/* Chức năng này vẫn đang trong quá trình phát triển. Hãy quay lại sau! */}
          <ProjectManagement />
        </div>
      </Container>
    </div>
  );
}
