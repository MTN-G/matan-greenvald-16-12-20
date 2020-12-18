import React, { useState } from "react";
import {
  StyledDiv,
  StyledSelect,
  StyledForm,
} from "../styles/styledComponents";
import axios from "axios";
import { Item, Label, Store } from "../typescript/interfaces";
import { Button, TextField } from "@material-ui/core";
import { validURL } from '../helpers'

interface NewItemProps {
  setToggle: Function;
  stores: Store[];
  items: Item[];
    labels: Label[];
    setItems: Function;
  setStores: Function;
  setLabels: Function;
  getItems: Function;
  getStores: Function;
  getLabels: Function;
}

const NewItem: React.FC<NewItemProps> = ({
  setToggle,
  items,
    stores,
    labels,
    setItems,
    setStores,
  setLabels,
  getItems,
  getStores,
  getLabels,
}) => {
  const [newItem, setNewItem] = useState<Partial<Item>>({});
  const [newStore, setNewStore] = useState<Partial<Store>>({});
  const [newLabel, setNewLabel] = useState<Partial<Label>>({});
  const [error, setError] = useState<string>(" ");

  async function addItem(item: Partial<Item>) {
    try {
      if (!item.name) setError("item name is required");
      else if (item!.estimatedDate! <= new Date().getTime())
        setError("invalid date");
      else if (!item.price) setError("invalid price");
      else if (!item.labels) setError("please select label");
      else if (!item.store ||item!.name === "select store") setError("please select store");
      else {
        const res = await axios.post("/api/items", item);
          setError("");
          setNewItem({})
        return res.statusText;
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    };

    async function addStore(store: Partial<Store>) {
        try {
          if (!store.name || store!.name === "select store") setError("store name is required");
          else if (!store.link || !validURL(store!.link)) setError("invalid link");
          else {
              const res = await axios.post("/api/stores", store);
              setNewStore({})
            return res.statusText;
          }
        } catch (error) {
          setError(error.message);
          console.log(error);
        }
    }
    
    async function addLabel(label: Partial<Label>) {
        try {
          if (label!.name!.length <= 1 || label!.name === "select label") setError("label name is required");
          else {
              const res = await axios.post("/api/labels", label);
              setNewLabel({})
            return res.statusText;
          }
        } catch (error) {
          setError(error.message);
          console.log(error);
        }
      }

  return (
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
          <StyledSelect
            onChange={(e: any) => {
              const tempItem = newItem;
              tempItem!.store = stores.find(
                (store) => store.name === e.target.value
              )?.id!;
              setNewItem(tempItem);
            }}
          >
            <option>select store</option>
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
                      onClick={async () => {
                          await addStore(newStore)
                          getStores(setStores);
            }}
          >
            save store
          </Button>
        </div>
        <span>
          {error.length > 1 && (
            <StyledDiv
              repeatFormula="1fr"
              style={{ backgroundColor: "red", marginBottom: "60%" }}
            >
              {error}
            </StyledDiv>
          )}
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <StyledSelect
            onChange={(e: any) => {
              const tempItem = newItem;
              tempItem!.labels = [
                labels.find((label) => label.name === e.target.value)?.id!,
              ];
              setNewItem(tempItem);
            }}
          >
            <option>select label</option>
            {labels.map((label) => (
              <option>{label.name}</option>
            ))}
          </StyledSelect>
          <TextField
            id="standard-basic"
            label="new label"
                      onChange={(e) => setNewLabel({ name: e.target.value })}
          />
          <Button
            variant="contained"
                      onClick={async () => {
                          await addLabel(newLabel);
              getLabels(setLabels);
            }}
          >
            save label
          </Button>
        </div>
      </StyledForm>
      <div style={{ display: "flex", gap: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const status = await addItem(newItem);
            if (status === "OK") {
              setToggle(false);
                getItems("waiting", setItems);
                getStores(setStores)
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
  );
};

export default NewItem;
