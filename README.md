**Filesystem Todo CLI**

A simple command-line todo list manager built with Node.js.
It stores todos in a local JSON file (todo.json) and lets you manage tasks directly from your terminal.

**🚀 Features**

Add new todos

Delete todos (by index or text)

Mark todos as done

List all todos with status

Data persistence using todo.json (filesystem storage)

**📂 How It Works**

All tasks are stored in todo.json as an array of objects:

```
[
  { "text": "Buy groceries", "done": false },
  { "text": "Finish project", "done": true }
]
```


Each todo has:

text: task description

done: boolean (true if completed)

**⚙️ Usage**
Add a todo
todo add "Buy groceries"

List todos
todo list


Output:
```
Your Todos:
1. [ ] Buy groceries
2. [✔] Finish project
```

Mark as done
```
npm main.js done 1
```


Delete a todo
```
npm main.js delete 2
```


**🛠 Tech Stack**

Node.js

Commander.js (for CLI commands)

fs (filesystem) module for reading/writing todo.json

**✅ Why this project?**

Teaches how to build a real CLI tool

Shows how to manage data via the filesystem


