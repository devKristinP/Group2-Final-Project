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
        /*currently returning first task with ID of zero, will eventually show number increasing*/
    }

};
/*
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi"); */