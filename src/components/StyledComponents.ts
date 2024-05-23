import styled, { css } from "styled-components";

export const BoardContainer = styled.div<{ $isActive: boolean }>`
  height: 100%;
  border: ${({ $isActive }) =>
    $isActive ? "2px dashed #4caf50" : "2px dashed transparent"};
  position: relative;
`;

export const selectedNodeStyle = css`
  box-shadow: 0 0 0 3px #007bff !important;
  border: 2px solid #007bff !important;
`;

export const NodeContainer = styled.div<{ $isSelected: boolean }>`
  padding: 10px;
  border: 1px solid #6b6b6b;
  border-radius: 5px;
  background: #fff;
  ${({ $isSelected }) => $isSelected && selectedNodeStyle}
`;

export const ToolbarContainer = styled.div`
  padding: 10px;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 900;
  font-size: 1.5em;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

export const ProjectTitle = styled.h1`
  font-size: 1.5em;
  color: #333;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

export const Button = styled.button<{ bgcolor?: string; hovercolor?: string }>`
  background: ${({ bgcolor }) => bgcolor || "#007bff"};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${({ hovercolor }) => hovercolor || "#0056b3"};
  }
`;

export const ComponentContainer = styled.div`
  padding: 10px;
  border: 1px solid #ababab;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #fff;
  cursor: pointer;
`;
