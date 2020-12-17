import React, { useCallback, useEffect, useState } from "react";
import { H1, StyledDiv, StyledUl, Wrapper, EditDiv, TableHeader, StyledSelect } from "../styles/styledComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from 'axios'
import { Item, Label, Store } from "../interfaces";
import { Button, TextField} from "@material-ui/core";
import SimpleModal from './Modal'

const List :React.FC<{}> = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [labels, setLabels] = useState<Label[]>([])
    const [search, setSearch] = useState('');
    const [toggleAdd, setToggle] = useState<boolean>(false)

    const getItems = useCallback(async () => {
        const data: Item[] = await (await axios.get('/api/items/all/waiting', {
            params: {
                search
            }
        })).data
        setItems(data)
    }, [search])

    
    const getLabels = useCallback(async () => {
        const data: Label[] = await (await axios.get('/api/labels/all')).data
        setLabels(data)
        console.log(data)
    }, [])
    
    const getStores = useCallback(async () => {
        const data: Store[] = await (await axios.get('/api/stores/all')).data
        setStores(data)
        console.log(data)
    }, []);
    
    useEffect(() => {
        getItems()
        getStores()
        getLabels()
    }, [getItems, getStores, getLabels]);

    async function addItem(item: Item) {
        await axios.post("/api/items", item);
    }
  
    return (
      <>
        <Wrapper padding="50px" style={{display: "flex", flexDirection: "column", gap: "20px"}}>
          <H1 color={"green"}>What Are We Waiting For?</H1>
                <Button variant="contained" color="secondary" style={{ maxWidth: "200px" }} onClick={() => setToggle(true)}>Add item</Button>
                {toggleAdd && 
                    <form>
                        <TextField id="standard-basic" label="Standard" />
          <TextField
                id="date"
                label="Estimated Arriving"
                type="date"
                defaultValue={new Date()}
                InputLabelProps={{
                shrink: true,
              }}
              
          />
                    <StyledSelect>
                        {stores.map(store => <option>{store.name}</option>)}
          </StyledSelect>
                    <StyledSelect> {labels.map(label => <option>{label.name}</option>)}</StyledSelect>
                    </form>}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <StyledUl>
                        <TableHeader repeatFormula="2fr 1fr 2fr 2fr 0.5fr 0.5fr">
                            <span>Item</span>
                            <span>Price</span>
                            <span>EST date</span>
                            <span>Store</span>
                        </TableHeader>
              {items &&
                items.map((item) => (
                    <StyledDiv style={{backgroundColor: "#c2bfb8"}} repeatFormula="2fr 1fr 2fr 2fr 0.5fr 0.5fr">
                        <span>{item.name}</span>
                        <span>{item.price}$</span>
                        <span>{item.estimatedDate}</span>
                        <span>{item.store}</span>
                        <Button variant="contained" color="secondary">EDIT</Button>
                        <Button ><DeleteIcon/></Button>
                    </StyledDiv>
                ))}
            </StyledUl>
            <StyledUl>
              {stores &&
                stores.map((store) => (
                  <StyledDiv repeatFormula=" 1fr 1fr">{store}</StyledDiv>
                ))}
            </StyledUl>
                </div>
            </Wrapper>
            <Wrapper padding="50px" style={{display: "flex", flexDirection: "column", gap: "20px"}}>
          <H1 color={"green"}>My Stores</H1>
          
        </Wrapper>
      </>
    );
  }

export default List;
  