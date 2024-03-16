import React from "react";
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

const AddItemForm = ({ onItemCreate }) => {
    const [newItem, setNewItem] = React.useState('');

    const onChange = (event) => {
        setNewItem(event.target.value);
    };

    const onCreate = (event) => {
        event.preventDefault();
        onItemCreate(newItem);
        setNewItem('');
    };

    return (
        <Form onSubmit={onCreate}>
            <InputGroup>
                <FormControl
                    value={newItem}
                    type="text"
                    placeholder="New Item"
                    onChange={onChange}
                />
                <Button
                    type="submit"
                    variant="primary"
                    disabled={!newItem.length}
                >
                    Add
                </Button>
            </InputGroup>
        </Form>
    );
};

export default AddItemForm;
