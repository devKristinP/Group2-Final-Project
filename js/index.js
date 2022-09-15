//console.log('Hello World');
/*class TaskManager {

  constructor(currentId = 0){
      this.tasks = []; //this is the task list
      this.currentId = currentId;
  }
};
*/
const taskManager = new taskManager(1);
taskManager.addTask("Laundry", "fold", "Bob", "12/31/2022");
taskManager.addTask("Laundry", "fold", "Bob", "12/31/2022");
console.log(taskManager.tasks);
function formValidation(e) {
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const assignedTo = document.getElementById("assignedTo");
  const dueDate = document.getElementById("dueDate");
  const form = document.getElementById('form')
  const errorElement = document.getElementById("error");

  /*let messages = [];
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
  }*/


form.addEventListener("submit", formValidation);

const newTask = new taskManager();
console.log(newTask);


//const tasksList = document.querySelector('#tasksList');

// Select the New Task Form
// Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

/// Add an 'onsubmit' event listener
newTaskForm.addEventListener('submit', (event) => {
  // Prevent default action
  event.preventDefault();

    

    // Select the inputs
    // Select the inputs
    const newTaskName = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskdueDate');

    
    /*
        Validation code here
    */

    // Get the values of the inputs
    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;
    /*if(!validFormFieldInput(name)){
       errorMessage.innerHTML = "Invalid name input";
       errorMessage.style.display = "block"
    }else{
        errorMessage.style.display = "none"
    }*/

});

/*function validFormFieldInput(data){
    return data !== null && data !== '';
}*/

// Add the task to the task manager

taskManager.addTask(name, description, assignedTo, dueDate);

//taskManager.addTask(nameValue,descriptionValue,assignedToValue,dueDateValue);
//const taskHtml = createTaskHtml('Group2', 'wash dishs','nebyu','9/20/2022');
//console.log(taskHtml);


// Save the tasks to localStorage
//taskManager.save();

// Render the tasks
taskManager.render();

const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `
   <li class="list-group-item" data-task-id=${id}>
   </l>
`;

// Add the task to the task manager
taskManager.addTask(name, description, assignedTo, dueDate);

// Clear the form
newTaskNameInput.value = '';
newTaskDescription.value = '';
newTaskAssignedTo.value = '';
newTaskDueDate.value = '';

// Select the Tasks List
const tasksList = document.querySelector('#tasksList');

// Add an 'onclick' event listener to the Tasks List
tasksList.addEventListener('click', (event) => {

  // Check if a "Mark As Done" button was clicked

  if (event.target.classList.contains('done-button')) {

      // Get the parent Task
      
      const parentTask = event.target.parentElement.parentElement;

      // Get the taskId of the parent Task.
      const taskId = Number(parentTask.dataset.taskId);

      // Get the task from the TaskManager using the taskId
      const task = taskManager.getTaskById(taskId);

        // Update the task status to 'DONE'
        task.status = 'DONE';

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
  });

}
