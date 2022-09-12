function createTaskHtml(name, description, assignedTo, dueDate) {
    const html = `<li class="list-group-item">Dishes
    <div class="task-cards">
      <div class="card  border-dark border-5 my-5 ml-3" style="width: 18rem">
        <div class="card-body">
          <ul class="card-text" style="list-style: none">
            <div class="d-flex justify-content-end">
              <input class="form-check-input" type="checkbox" />
            </div>
            <li>Task Name${name}</li>
            <li>Task Description${description}</li>
            <li>Assigned To${assignedTo}</li>
            <li>Due Date${dueDate}</li>
            <li>Status</li>`
            console.log(html);
//intialize a new taskManager with currentId set to 0
 const taskManager = new taskManager(0);

 //select the new Task Form
 const newTaskForm = document.querySelector('#newTaskForm');

 //add an 'onsubmit' event listener
 newTaskForm.addEventListener('submit', (Event) =>{
    //prevent default action
    Event.preventDefault();
 

 const newTaskName = document.querySelector('#newTaskNme');
 const newTaskDescription = document.querySelector('#newTaskDescription');
 const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
 const newTaskDueDate = document.querySelector('#newtaskDueDate');
 
  const nameValue = name.value;
  const descriptionValue = description.value;
  const assignedToValue = assignedTo.value;
  const dueDateValue = dueDate.value;

  taskManager.addTask(nameValue,descriptionValue,assignedToValue,dueDateValue);
  const taskHtml = createTaskHtml('Group2', 'wash dishs','nebyu','9/20/2022');
console.log(taskHtml);


class TaskManager {

    constructor(currentId = 0){
        this.tasks = []; //this is the task list
        this.currentId = currentId;
    }

     // Method-- creating a task object and the key value pairs
    addTask(name, description, assignedTo, dueDate) {
        const task = {
            id: this.currentId++, 
            name: name, 
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: 'Todo',
        }   
        this.tasks.push(task);
        /*may currently return first task with ID of zero, will eventually show number increasing*/
    }

};
/*
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi"); /