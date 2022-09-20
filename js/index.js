import { TaskManager } from "./taskManager.js"

//console.log('Hello World');
/*class TaskManager {

  constructor(currentId = 0){
      this.tasks = []; //this is the task list
      this.currentId = currentId;
  }
};
*/

const taskManager = new TaskManager()

//taskManager.addTask("Laundry", "fold", "Bob", "12/31/2022");
//taskManager.addTask("Laundry", "fold", "Bob", "12/31/2022");
//console.log(taskManager.tasks);

//const tasksList = document.querySelector('#tasksList');

// Select the New Task Form
// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm")

// Limit due date to today or in the future
document
  .getElementById("newTaskDueDate")
  .setAttribute("min", new Date().toISOString().slice(0, 10))

/// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault()
  const formData = new FormData(event.currentTarget)

  for (const p of formData) {
    console.log(p)
  }

  // Select the inputs
  // Select the inputs
  const newTaskName = document.querySelector("#newTaskNameInput")
  const newTaskDescription = document.querySelector("#newTaskDescription")
  const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo")
  const newTaskDueDate = document.querySelector("#newTaskDueDate")

  // Validation code here -

  let messages = []
  if (newTaskName.value == "" /* || newTaskName.value == null*/) {
    messages.push("Name is required")
  }

  if (newTaskDescription.value == "" /*|| newTaskDescription.value == null*/) {
    messages.push("Enter Description for task")
  }

  if (newTaskAssignedTo.value == "" /*|| newTaskAssignedTo.value == null*/) {
    messages.push("Task must be assigned")
  }

  if (newTaskDueDate.value == "" /*|| newTaskDueDate.value == null*/) {
    messages.push("Enter a due date")
  }

  if (messages.length > 0) {
    //e.preventDefault();
    const errorElement = document.querySelector("#errorElement")
    errorElement.innerHTML = messages.join(", ")
  }

  // Get the values of the inputs
  const name = newTaskNameInput.value
  const description = newTaskDescription.value
  const assignedTo = newTaskAssignedTo.value
  const dueDate = newTaskDueDate.value
  /*if(!validFormFieldInput(name)){
       errorMessage.innerHTML = "Invalid name input";
       errorMessage.style.display = "block"
    }else{
        errorMessage.style.display = "none"
    }*/
  taskManager.addTask(name, description, assignedTo, dueDate)

  //taskManager.addTask(nameValue,descriptionValue,assignedToValue,dueDateValue);
  //const taskHtml = createTaskHtml('Group2', 'wash dishs','nebyu','9/20/2022');
  //console.log(taskHtml);

  // Save the tasks to localStorage
  //taskManager.save();

  // Clear the form
  newTaskNameInput.value = ""
  newTaskDescription.value = ""
  newTaskAssignedTo.value = ""
  newTaskDueDate.value = ""
})

/*function validFormFieldInput(data){
    return data !== null && data !== '';
}*/

// Add the task to the task manager

// Select the Tasks List
const tasksList = document.querySelector("#tasksList")

// Add an 'onclick' event listener to the Tasks List
tasksList.addEventListener("click", (event) => {
  // Check if a "Mark As Done" button was clicked

  if (event.target.classList.contains("done-button")) {
    // Get the parent Task

    const parentTask = event.target.closest(".list-group-item")

    // Get the taskId of the parent Task.
    console.log("number before taskId", parentTask.dataset.taskId)
    const taskId = Number(parentTask.dataset.taskId)
    console.log("number from taskId", taskId)

    // Get the task from the TaskManager using the taskId
    taskManager.markTaskDone(taskId)

    /**
     * removed manual save() and render() calls
     */
  }
})
