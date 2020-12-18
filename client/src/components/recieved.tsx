import React, { useEffect, useState } from "react";
import {
  H1,
  StyledDiv,
  StyledUl,
  Wrapper,
  TableHeader,
} from "../styles/styledComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { Item, Label, ListPageProps, Store } from "../typescript/interfaces";
import { Button } from "@material-ui/core";
import UndoIcon from "@material-ui/icons/Undo";
import { convertDateToString } from "../helpers";

const Recieved: React.FC<ListPageProps> = ({
  currency,
  getItems,
  getLabels,
  getStores,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    getItems("recieved", setItems);
    getStores(setStores);
    getLabels(setLabels);
  }, [getItems, getStores, getLabels]);

  async function unRecieveItem(item: Item) {
    try {
      const id = item.id;
      await axios.put(`/api/items/recieved/${id}/false`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper
      padding="50px"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <H1 color={"green"}>My Older Stuff</H1>
      <StyledUl>
        <TableHeader repeatFormula=" 1fr 2fr 2fr 2fr 2fr 0.5fr 0.5fr">
          <span />
          <span>Item</span>
          <span>Price</span>
          <span>EST date</span>
          <span>Store</span>
        </TableHeader>
        {items &&
          items.map((item) => (
            <StyledDiv
              style={{ backgroundColor: "#c2bfb8" }}
              repeatFormula="1fr 2fr 1fr 1fr 2fr 2fr 0.5fr"
            >
              <Button
                onClick={async () => {
                  await unRecieveItem(item);
                  getItems("recieved", setItems);
                }}
              >
                <UndoIcon />
              </Button>
              <b>{item.name}</b>
              <span>{item.price}$</span>
              <span>{Math.floor(item.price * currency)} ILS</span>
              <span>{convertDateToString(item.estimatedDate)}</span>
              <span>{item.store}</span>
              <Button
                onClick={async () => {
                  await axios.delete(`api/items/${item.id}`);
                  getItems("recieved", setItems);
                }}
              >
                <DeleteIcon />
              </Button>
            </StyledDiv>
          ))}
      </StyledUl>
      <TableHeader repeatFormula="1.2fr 1fr 1fr">
        <b>Total:</b>
        <span>{items.reduce((prev, curr) => prev + curr.price, 0)}$</span>
        <span>
          {Math.floor(
            items.reduce((prev, curr) => prev + curr.price, 0) * currency
          )}{" "}
          ILS
        </span>
      </TableHeader>
    </Wrapper>
  );
};

export default Recieved;
