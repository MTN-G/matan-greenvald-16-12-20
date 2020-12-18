import React, { useEffect, useState } from "react";
import NewItem from "./newItem";
import {
  H1,
  StyledDiv,
  StyledUl,
  Wrapper,
  TableHeader,
} from "../styles/styledComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { Item, Label, Store, ListPageProps } from "../typescript/interfaces";
import { Button } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { convertDateToString } from "../helpers";

const List: React.FC<ListPageProps> = ({ currency, getItems, getLabels, getStores }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [toggleAdd, setToggle] = useState<boolean>(false);

  useEffect(() => {
    getItems("waiting", setItems);
    getStores(setStores)
    getLabels(setLabels);
  }, [getItems, getStores, getLabels]);

  async function recieveItem (item: Item) {
    try {
      const id = item.id;
      await axios.put(`/api/items/recieved/${id}/true`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Wrapper
        padding="50px"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <H1 color={"green"}>What Are We Waiting For?</H1>
        <Button
          variant="contained"
          color="secondary"
          style={{ maxWidth: "200px" }}
          onClick={() => setToggle(true)}
        >
          Add item
        </Button>
        {toggleAdd && (
          <NewItem
            setToggle={setToggle}
            items={items}
            stores={stores}
            labels={labels}
            getItems={getItems}
            getStores={getStores}
            getLabels={getLabels}
          />
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <StyledUl>
            <TableHeader repeatFormula="1fr 2fr 2fr 2fr 2fr 0.5fr 0.5fr">
              <span/>
              <span>Item</span>
              <span>Price</span>
              <span>EST date</span>
              <span>Store</span>
            </TableHeader>
            {items &&
              items.map((item) => (
                <StyledDiv
                  style={{ backgroundColor: item.estimatedDate < Date.now() ? "#ed4539": "#c2bfb8" }}
                  repeatFormula="1fr 2fr 1fr 1fr 2fr 2fr 0.5fr 0.5fr"
                >
                  <Button onClick={async () => {
                    await recieveItem(item)
                    getItems("waiting", setItems)
                  }
                  }><CheckCircleIcon fontSize="large" style={{ color: "green" }} /></Button>
                  <b>{item.name}</b>
                  <span>{item.price}$</span>
                  <span>{Math.floor(item.price * currency)} ILS</span>
                  <span>{convertDateToString(item.estimatedDate) }</span>
                  <span>{item.store}</span>
                  <Button variant="contained" color="secondary">
                    EDIT
                  </Button>
                  <Button onClick={async () => {
                    await axios.delete(`api/items/${item.id}`)
                    getItems("waiting", setItems)
                  }}>
                    <DeleteIcon />
                  </Button>
                </StyledDiv>
              ))}
          </StyledUl>
        </div>
         <TableHeader repeatFormula="1.2fr 1fr 1fr">
        <b>Total:</b>
        <span>{items.reduce((prev, curr) => prev + curr.price, 0)}$</span>
        <span>{Math.floor(items.reduce((prev, curr) => prev + curr.price, 0) * currency)} ILS</span>
      </TableHeader>
      </Wrapper>
      <Wrapper
        padding="50px"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <H1 color={"green"}>My Stores</H1>
        <StyledUl>
          <TableHeader repeatFormula=" 3fr 3fr 3fr">
            <span>Store</span>
            <span>Items From</span>
            <span>Link</span>
          </TableHeader>

          {stores &&
            stores.map((store: any) => (
              <StyledDiv repeatFormula=" 3fr 3fr 3fr">
                <b>{store.name}</b>
                <span>{store.count}</span>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => (window.location.href = "https:" + store.link)}
                >
                  Website
                </Button>
              </StyledDiv>
            ))}
        </StyledUl>
        
      </Wrapper>
    </>
  );
};

export default List;
