import styled from "styled-components";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItem } from "@material-ui/core";

export const errorIconStyle = { width: "30px", height: "30px" };

export const iconStyle = { cursor: "default" };

export const repeatFormula = "1fr 2.5fr 2.5fr 1fr";

export const H1 = styled.h1`
  z-index: 1;
  padding: 10px 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 27px;
  color: white;
  margin: 0;
  display: inline;
  background-color: ${(props: { color: string }) =>
    props.color ? props.color : "#3f51b5"};
  border-radius: 5px;
  min-width: 180px;
  box-shadow: 5px 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  z-index: 2;
  text-align: center;
`;

export const TitleWrapper = styled.div`
  /* position: absolute; */
  /* left: 50%; */
  /* top: 50%; */
  /* width: 50%; */
  height: 0px;
  transform: translate(0, -60px);
`;

interface WrraperProps {
  margin?: string,
  padding?: string,
  width?: string,
  backgroundColor?: string,
  color?: string
};

export const Wrapper = styled.div<WrraperProps>`
  margin: ${(props: WrraperProps) =>
    props.margin ? props.margin : "5% auto"};
  width: 80%;
  padding: ${(props: WrraperProps) =>
    props.padding ? props.padding : "40px"};
  border-radius: 7px;
  box-shadow: 5px 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  min-width: 300px;
  max-width: ${(props: WrraperProps) =>
    props.width ? props.width : "700px"};
  background-color: ${(props: WrraperProps) =>
    props.backgroundColor ? props.backgroundColor : "white"};
  color: ${(props: WrraperProps) => (props.color ? props.color : "black")};
  position: relative;
  align-items: center;
`;

export const Center = styled.div`
  text-align: center;
`;

interface LinkProps {
  color: string,
  textDecoration: string
}

export const StyledLink = styled(Link)<LinkProps>`
  color: ${(props: { color: string }) => (props.color ? props.color : "white")};
  text-decoration: ${(props: { textDecoration: string }) =>
    props.textDecoration ? "underline" : "none"};
`;

export const RemoveJobButton = styled(DeleteIcon)`
  color: #cf1d1d;
  transition: 200ms;

  &:hover {
    color: red;
    background-color: rgba(99, 99, 99, 0.1);
    border-radius: 50%;
    box-shadow: 0px 0px 0 10px rgba(99, 99, 99, 0.1);
  }
`;

export const GridDiv = styled.div`
  display: grid;
  width: 95%;
  grid-template-columns: ${(props: { repeatFormula: string }) =>
    props.repeatFormula ? props.repeatFormula : "1fr 1fr"};
`;

export const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: ${(props: { repeatFormula: string }) =>
    props.repeatFormula ? props.repeatFormula : "1fr 2.5fr 2fr 2.5fr 2fr"};
  padding: 10px;
  align-items: center;
  background-color: rgba(22, 22, 22, 0.486);
  transition: 150ms;
  border-radius: 2px;
  margin: 2px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.65);
  }
`;

export const StyledForm = styled.form`
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: 30% 30% 30%;
  grid-template: "input input input";
`

export const TableHeader = styled(StyledDiv)`
  background-color: rgba(20, 20, 25, 0.6);
  color: white;
  &:hover {
    background-color: rgba(20, 20, 25, 0.6);
  }
`;

export const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const MultilineListItem = styled(ListItem)`
  white-space: pre-wrap;
`;

export const StyledSelect = styled.select`
  width: 100%;
  min-width: 50px;
  max-width: 300px;
  border: 1px solid yellowgreen;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  align-items: center;
  position: relative;

  ::after {
    width: 0.8em;
    height: 0.5em;
    background-color: #fff;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    justify-self: end;
  }
`;

export const EditDiv = styled.div`
  cursor: pointer;
  position: absolute;
  right: 33px;
  top: 25px;
`;