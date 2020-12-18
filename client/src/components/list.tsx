import React, { useCallback, useEffect, useState } from "react";
import {
  H1,
  StyledDiv,
  StyledUl,
  Wrapper,
  TableHeader,
  StyledSelect,
  StyledForm,
} from "../styles/styledComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { Item, Label, Store } from "../../typescript/interfaces";
import { Button, TextField } from "@material-ui/core";
import { convertDateToString } from "../helpers";

const List: React.FC<{ currency: number }> = ({ currency }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [toggleAdd, setToggle] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Partial<Item>>({});
  const [newStore, setNewStore] = useState<Partial<Store>>();
  const [newLabel, setNewLabel] = useState<Partial<Label>>();
  const [error, setError] = useState<string>(" ");
  const getItems = useCallback(async () => {
    const data: Item[] = await (await axios.get("/api/items/all/waiting")).data;
    data.map((item: Item) => {
      item.estimatedDate = convertDateToString(item.estimatedDate!);
      return item;
    });
    setItems(data);
  }, []);

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

  async function addItem(item: Partial<Item>) {
    try {
      if (!item.name) setError("item name is required");
      else if (item!.estimatedDate! <= new Date().getTime())
        setError("invalid date");
      else if (item!.price! <= 1) setError("invalid proce");
      else {
        await axios.post("/api/items", item);
        setError("");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
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
          <>
            <StyledForm>
              <TextField
                id="standard-basic"
                label="Item"
                onChange={(e) => {
                  const tempItem = newItem;
                  tempItem!.name = e.target.value;
                  setNewItem(tempItem);
                }}
              />
              <TextField
                id="standard-basic"
                type="number"
                label="price (USD)"
                onChange={(e) => {
                  const tempItem = newItem;
                  tempItem!.price = parseInt(e.target.value);
                  setNewItem(tempItem);
                }}
              />
              <TextField
                id="date"
                label="Estimated Arriving"
                type="date"
                defaultValue={new Date()}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const tempItem = newItem;
                  tempItem!.estimatedDate = new Date(e.target.value).getTime();
                  setNewItem(tempItem);
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>select store</span>
                <StyledSelect>
                  {stores.map((store) => (
                    <option>{store.name}</option>
                  ))}
                </StyledSelect>
                <TextField
                  id="standard-basic"
                  label="new store"
                  onChange={(e) => {
                    const tempStore = newStore;
                    tempStore!.name = e.target.value;
                    setNewStore(tempStore);
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="add link"
                  onChange={(e) => {
                    const tempStore = newStore;
                    tempStore!.link = e.target.value;
                    setNewStore(tempStore);
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    getStores();
                  }}
                >
                  save store
                </Button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>select label</span>
                <StyledSelect>
                  {labels.map((label) => (
                    <option>{label.name}</option>
                  ))}
                </StyledSelect>
                <TextField
                  id="standard-basic"
                  label="new label"
                  onChange={(e) => {
                    const tempLabel = newLabel;
                    tempLabel!.name = e.target.value;
                    setNewStore(tempLabel);
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    getLabels();
                  }}
                >
                  save label
                </Button>
              </div>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </StyledForm>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  await addItem(newItem);
                  if (error.length < 1) {
                    setToggle(false);
                    getItems();
                  }
                }}
              >
                SAVE ITEM
              </Button>

              <Button
                onClick={() => setToggle(false)}
                variant="contained"
                color="secondary"
              >
                Cencel
              </Button>
            </div>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                  repeatFormula="2fr 1fr 1fr 2fr 2fr 0.5fr 0.5fr"
                >
                  <b>{item.name}</b>
                  <span>{item.price}$</span>
                  <span>{Math.floor(item.price * currency)} ILS</span>
                  <span>{item.estimatedDate}</span>
                  <span>{item.store}</span>
                  <Button variant="contained" color="secondary">
                    EDIT
                  </Button>
                  <Button>
                    <DeleteIcon />
                  </Button>
                </StyledDiv>
              ))}
          </StyledUl>
        </div>
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
