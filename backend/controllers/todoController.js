const Todo = require("../models/todoModel");

async function createTodo(req, res) {
    const { username, ...todoData } = req.body;

    try {
        const newTodo = new Todo({ ...todoData, userId: username });
        await newTodo.save();

        res.status(201).json({
            message: "Todo created successfully",
            todo: newTodo,
        });
    } catch (error) {
        handleValidationError(error, res, "Cannot create todo");
    }
}

// async function getTodos(req, res) {
//     const { userId } = req.body;

//     try {
//         const todos = await Todo.find({ userId });

//         res.status(200).send(todos);
//     } catch (error) {
//         console.error("Error fetching todos:", error);
//         res.status(500).json({ message: "Cannot get todos" });
//     }
// }
async function getTodos(req, res) {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const todos = await Todo.find({ userId });

        if (!todos.length) {
            return res.status(404).json({ message: "No todos found for the given user" });
        }

        res.status(200).json({ message: "Todos retrieved successfully", todos });
    } catch (error) {
        console.error("Error fetching todos for userId:", userId, error);
        res.status(500).json({ message: "Cannot get todos" });
    }
}


async function editTodo(req, res) {
    const { todoId, editData } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, editData, {
            new: true,
        });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({
            message: "Todo was edited successfully",
            todo: updatedTodo,
        });
    } catch (error) {
        handleValidationError(error, res, "Failed to edit todo");
    }
}

async function deleteTodo(req, res) {
    const { todoId } = req.body;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
            todo: deletedTodo,
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Failed to delete todo" });
    }
}

function handleValidationError(error, res, defaultMessage) {
    if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        console.error("Validation Errors:", errors);
        res.status(400).json({
            message: "Validation failed",
            errors,
        });
    } else {
        console.error(defaultMessage, error);
        res.status(500).json({ message: defaultMessage });
    }
}

module.exports = { createTodo, getTodos, editTodo, deleteTodo };
