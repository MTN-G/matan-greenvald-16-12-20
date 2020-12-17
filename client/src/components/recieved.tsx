import React, { useCallback, useEffect, useState } from "react";
import {
  H1,
  StyledDiv,
  StyledUl,
  Wrapper,
  TableHeader,
  StyledSelect,
} from "../styles/styledComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { Item, Label, Store } from "../../typescript/interfaces";
import { Button, TextField } from "@material-ui/core";
import { convertDateToString } from "../helpers";

const Recieved: React.FC<{ currency: number }> = ({ currency }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [search, setSearch] = useState("");

  const getItems = useCallback(async () => {
    const data: Item[] = await (
      await axios.get("/api/items/all/recieved", {
        params: {
          search,
        },
      })
    ).data;
    data.map((item: Item) => {
      item.estimatedDate = convertDateToString(item.estimatedDate!);
      return item;
    });
    setItems(data);
  }, [search]);

  const getLabels = useCallback(async () => {
    const data: Label[] = (await axios.get("/api/labels/all")).data;
    console.log(data);

    setLabels(data);
  }, []);

  const getStores = useCallback(async () => {
    try {
      const data: Store[] = (await axios.get("/api/stores/all")).data;
      console.log(data);
      setStores(data);
    } catch (error) {
      console.trace(error);
    }
  }, []);

  useEffect(() => {
    getItems();
    getStores();
    getLabels();
  }, [getItems, getStores, getLabels]);

  return (
    <Wrapper
      padding="50px"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <H1 color={"green"}>My Older Stuff</H1>
      <StyledUl>
        <TableHeader repeatFormula="2fr 2fr 2fr 2fr 0.5fr 0.5fr">
          <span>Item</span>
          <span>Price</span>
          <span>EST date</span>
          <span>Store</span>
        </TableHeader>
        {items &&
          items.map((item) => (
            <StyledDiv
              style={{ backgroundColor: "#c2bfb8" }}
              repeatFormula="2fr 1fr 1fr 2fr 2fr 0.5fr"
            >
              <b>{item.name}</b>
              <span>{item.price}$</span>
              <span>{Math.floor(item.price * currency)} ILS</span>
              <span>{item.estimatedDate}</span>
              <span>{item.store}</span>
              <Button>
                <DeleteIcon />
              </Button>
            </StyledDiv>
          ))}
      </StyledUl>
    </Wrapper>
  );
};

export default Recieved;
