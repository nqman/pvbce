import styled from "@emotion/styled";

export const Signin = styled.button`
  color: black;
  cursor: pointer;
  display: flex;
  padding: 0px 8px;
  align-items: center;
  text-decoration: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  border-right: ${(props) => props.borderRight};
  transition: all 0.25s;

  &:hover {
    color: #d32f2f;
  }
`;

export const SpanHeader = styled.span`
  margin-left: 5px;
`;
export const Navbar = styled.button`
  color: #00477b;
  display: block;
  margin: 0 15px;
  margin-bottom: -10px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 5px;

  ::after {
    content: "";
    border-bottom: 3px solid #00477b;
    width: 0;
    display: block;
  }

  &:hover {
    ::after {
      content: "";
      width: 100%;
      transition: all 0.25s;
    }
  }
  /* &:hover {
    background-color: #007cd7;
    color: white;
    transition: all 0.25s;
    border-radius: 5px;
  } */
`;
