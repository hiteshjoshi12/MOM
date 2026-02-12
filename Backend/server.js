// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // 1. Connect to Local MongoDB
// mongoose.connect('mongodb+srv://hitesh:hitesh@mom.ba5lcxw.mongodb.net/?appName=MOM')
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => console.error('❌ MongoDB Connection Error:', err));


// // 2. Define the Schema (Structure of your data)
// const TaskSchema = new mongoose.Schema({
//     category: String,   // Changed to allow free text
//     desc: String,
//     owner: String,
//     priority: String,
//     status: String,
//     targetDate: Date,
//     remarks: String,    // <--- Added Remarks field
//     created: { type: Date, default: Date.now }
// });

// const Task = mongoose.model('Task', TaskSchema);

// // 3. API Routes

// // GET: Fetch all tasks
// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find().sort({ created: -1 });
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // POST: Add a new task
// app.post('/tasks', async (req, res) => {
//     try {
//         const newTask = new Task(req.body);
//         const savedTask = await newTask.save();
//         res.json(savedTask);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // PUT: Update status (or other fields)
// app.put('/tasks/:id', async (req, res) => {
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(
//             req.params.id, 
//             req.body, 
//             { new: true }
//         );
//         res.json(updatedTask);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // DELETE: Remove a task
// app.delete('/tasks/:id', async (req, res) => {
//     try {
//         await Task.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Task deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 1. Connect to MongoDB
// NOTE: Ensure your connection string is safe. For Vercel, usage of Environment Variables is recommended.
mongoose.connect('mongodb+srv://hitesh:hitesh@mom.ba5lcxw.mongodb.net/?appName=MOM')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 2. Define the Schema
const TaskSchema = new mongoose.Schema({
    category: String,
    desc: String,
    owner: String,
    priority: String,
    status: String,
    targetDate: Date,
    remarks: String,
    created: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', TaskSchema);

// 3. API Routes

// ✅ TEST ENDPOINT (For Vercel Check)
app.get('/', (req, res) => {
    res.send('<h1>🚀 MOM Tracker API is Running!</h1><p>Vercel deployment successful.</p>');
});

// GET: Fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ created: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Add a new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: Update status
app.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Remove a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Export the app for Vercel (Serverless)
module.exports = app;

// Only listen if running locally (not needed for Vercel, but good for local testing)
if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}