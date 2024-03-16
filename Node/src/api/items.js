const express = require('express');
const cassandra = require('cassandra-driver');
const router = express.Router();
require('dotenv').config();

const cluster = new cassandra.Client({
    contactPoints: ["node-0.aws-us-east-1.7cc8effec404e61d6bba.clusters.scylla.cloud", "node-1.aws-us-east-1.7cc8effec404e61d6bba.clusters.scylla.cloud", "node-2.aws-us-east-1.7cc8effec404e61d6bba.clusters.scylla.cloud"],
    localDataCenter: 'AWS_US_EAST_1',
    credentials: { username: 'scylla', password: 'Cydn4xv26tGScbN' },
    keyspace: 'todokeyspace'
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const result = await cluster.execute('SELECT * FROM items');
        res.json({ items: result.rows });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Internal server error');
    }
});

// Create an item
router.post('/', async (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO items(id, name, completed) VALUES (uuid(),?,?);';
    try {
        const result = await cluster.execute(query, [name, false]);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).send('Internal server error');
    }
});

// Delete an item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM items WHERE id=?';
    try {
        const result = await cluster.execute(query, [id]);
        res.status(200).send('Item deleted successfully');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal server error');
    }
});
 
// Update an item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const query = 'UPDATE items SET completed=? WHERE id=?';
    try {
        const result = await cluster.execute(query, [completed, id]);
        res.status(200).send('Item updated successfully');
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
