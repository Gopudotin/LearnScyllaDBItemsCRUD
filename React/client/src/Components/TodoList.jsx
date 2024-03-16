import React, { useEffect, useState } from "react";
import axios from "axios";
import AddItemForm from "./AddItemsForm";
import Item from "./item";
const BASE_URL = "http://localhost:3000/api/items";

const TodoList = () => {
    const [items, setItems] = useState(null);

    useEffect(() => {
        axios
            .get(BASE_URL)
            .then((res) => {
                console.log('API Response:', res.data);
                setItems(res.data.items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const onItemCreate = async (newItem) => {
        try {
            const response = await axios.post(BASE_URL, { name: newItem });
            console.log(response);
            setItems([...items, { name: newItem, completed: false, id: response.data.id }]);
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const onItemDelete = async (item) => {
        try {
            await axios.delete(`${BASE_URL}/${item.id}`);
            const updatedItems = items.filter(i => i.id !== item.id);
            setItems(updatedItems);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const onItemUpdate = async (item) => {
        const { id, completed } = item;
        try {
            await axios.put(`${BASE_URL}/${id}`, { completed }); 
            console.log('Item updated successfully');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };
    

    if (items === null) return <div>Loading...</div>;

    return (
        <div>
            <AddItemForm onItemCreate={onItemCreate} />
            {items.map((item) => (
                <Item key={item.id} item={item} onItemDelete={onItemDelete} onItemUpdate={onItemUpdate} />
            ))}
        </div>
    );
};

export default TodoList;
