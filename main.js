const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

function saveTodos(todos) {
  const jsonString = JSON.stringify(todos, null, 2);
  try {
    fs.writeFileSync("todo.json", jsonString, "utf8");
    console.log("File written successfully!");
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

function loadTodos() {
  try {
    const data = fs.readFileSync('todo.json', 'utf8');
    if (!data) {
      console.log("File is empty!");
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function listTodos() {
  const todos = loadTodos();
  todos.forEach((todo, index) => {
    console.log(`${index + 1}. [${todo.done ? '✔' : ' '}] ${todo.text}`);
  })
}

function addTodo(task) {
  const todos = loadTodos();
  todos.push({ text: task, done: false });
  saveTodos(todos)
  listTodos();
}

function deleteTodo(index, task) {
  fs.readFile('todo.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const todos = JSON.parse(data);
    todos.splice(index - 1, 1);
    const jsonString = JSON.stringify(todos, null, 2);
    fs.writeFile('todo.json', jsonString, 'utf8', (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("File written successfully!");
    });
  });
}

function markDone(index) {
  const todos = loadTodos();
  todos[index - 1].done = true;
  saveTodos(todos);
  listTodos();

}


program
  .name("todo")
  .description("A simple filesystem-based todo CLI")
  .version("1.0.0");

program
  .command("list")
  .description("List all todos")
  .action(() => {
    listTodos();
  });

program
  .command("add <task>")
  .description("Add a new todo")
  .action((task) => {
    addTodo(task);
  });

program
  .command("delete <index>")
  .description("Delete a todo by index")
  .action((index) => {
    deleteTodo(index);
  });

program
  .command("done <index>")
  .description("Mark a todo as done")
  .action((index) => {
    markDone(index);
  });

program.parse(process.argv);

