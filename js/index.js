//console.log('Hello World');
const taskManager = new TaskManager(1);
taskManager.addTask("Laundry", "fold", "Bob", "12/31/2022");
taskManager.addTask("Laundry", "fold", "Bob", "12/31/2022");
console.log(taskManager.tasks);
function formValidation(e) {
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const assignedTo = document.getElementById("assignedTo");
  const dueDate = document.getElementById("dueDate");
  // const form = document.getElementById('form')
  const errorElement = document.getElementById("error");

  let messages = [];
  if (name.value === "" || name.value == null) {
    messages.push("Name is required");
  }

  if (description.value === "" || description.value == null) {
    messages.push("Enter Description for task");
  }

  if (assignedTo.value === "" || assignedTo.value == null) {
    messages.push("Task must be assigned");
  }

  if (dueDate.value === "" || dueDate.value == null) {
    messages.push("Enter a due date");
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerHTML = messages.join(", ");
  }
}

form.addEventListener("submit", formValidation);

const newTask = new TaskManager();
console.log(newTask);
