import React from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';

const Item = ({ item, onItemDelete, onItemUpdate }) => {
    const [completed, setCompleted] = React.useState(item.completed);

    const onDelete = () => {
        onItemDelete(item);
    };

    const toggleCompletion = () => {
        const updatedItem = { ...item, completed: !completed };
        onItemUpdate(updatedItem);
        setCompleted(!completed);
    };

    return (
        <Row>
            <Col xs={1}>
                <Form>
                    <Form.Check
                        type="checkbox"
                        onChange={toggleCompletion}
                        checked={completed}
                    />
                </Form>
            </Col>

            <Col xs={10} className={completed ? 'completed' : ''}>{item.name}</Col>
            <Col xs={1}>
                <Button variant='Link' onClick={onDelete}>
                    <i className='fa fa-remove text-danger' />
                </Button>
            </Col>
        </Row>
    );
};

export default Item;
