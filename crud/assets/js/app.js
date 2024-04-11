import { createTask, deleteTask, getAllTasks, getAllUsers, updateTask } from './petitions.js';
const listUsers = document.getElementById('users');
const listTasks = document.getElementById('tasks');
const listTask = document.getElementById('listTasks');
const boxtask = document.getElementById('form-task');
const updateListTasks = document.getElementById('botonactualizar');
const botonSubir = boxtask.children[3];
let updatingTask = false;
let selectedTaskId;

document.addEventListener('DOMContentLoaded', async () => {
    const users = await getAllUsers();
    const tasks = await getAllTasks(); 
    console.log("boton ",botonSubir)
    let template = listUsers.innerHTML;
    let templatedos = listTask.innerHTML;
    let templatetres = '';
    for (const user of users) {
      template += `
        <option value="${user.id}">${user.fullname}</option>
        `;

    };

    for (const tarea of tasks){
      templatetres += `
        <tr>
            <td>${tarea.iduser}</td>
            <td>${tarea.name}</td>
            <td>${tarea.idtask}</td>
            <td>${tarea.tittle}</td> 
            <td></td>
            <td>
            <button class="task-update btn btn-secondary btn-sm" value="${tarea.idtask}">
              <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="task-delete btn btn-danger btn-sm" value="${tarea.idtask}">
              <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        </tr>     
        `;
    };

    for (const tarea of tasks) {
        templatedos += `
        <option value="${tarea.idtask}">${tarea.idtask}</option>
        `;
    };

listUsers.innerHTML = template;

    listTask.innerHTML = templatedos; 
    listTasks.innerHTML = templatetres; 

    listTask.addEventListener('change', async function() {
      const idtareaseleccionada = this.value;
      console.log('id: ', idtareaseleccionada);
      const idtarea = await fetch(`api/getTask.php?selectedTaskId=${idtareaseleccionada}`);
      const data = await idtarea.json();
      console.log(data);
      let templatetres = '';

      for (const task of data) {
        templatetres += `
              <tr>
                  <td>${task.iduser}</td>
                  <td>${task.name}</td>
                  <td>${task.idtask}</td>
                  <td>${task.title}</td> 
                  <td></td>
                  <td>
                      <button class="task-update btn btn-secondary btn-sm" value="${task.idtask}">
                          <span>Update</span> <i class="nf nf-md-pencil"></i>
                      </button>
                      <button class="task-delete btn btn-danger btn-sm" value="${task.idtask}">
                          <span>Delete</span> <i class="nf nf-cod-trash"></i>
                      </button>
                  </td>
              </tr>     
          `;
      }

      listTasks.innerHTML = templatetres;

  });

  updateListTasks.addEventListener('click', async () => {
    const tareas = await getAllTasks();
    let templatetres = '';

    for (const tarea of tareas){
      templatetres += `
        <tr>
            <td>${tarea.iduser}</td>
            <td>${tarea.name}</td>
            <td>${tarea.idtask}</td>
            <td>${tarea.tittle}</td> 
            <td></td>
            <td>
            <button class="task-update btn btn-secondary btn-sm" value="${tarea.idtask}">
              <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="task-delete btn btn-danger btn-sm" value="${tarea.idtask}">
              <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        </tr>     
        `;
    };

  listTasks.innerHTML = templatetres;
    
  boxtask.reset();
});


boxtask.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(boxtask);
  const title = formData.get('title');
  const userId = formData.get('users');
  if (updatingTask==false) {
    await createTask(formData);
  } else {
    await updateTask(formData,selectedTaskId)
  }
});

  document.addEventListener('click', async (event) => {
  if ( event.target.classList.contains('task-delete')) {
      const idtarea = event.target.value;
        console.log('ID tarea borrar:', idtarea);
        await deleteTask(idtarea);
    }
});

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('task-update')) {
    const idactualizar = event.target.value;
    selectedTaskId = idactualizar;
    console.log("Id",selectedTaskId)
    const taskInfo = await fetch(`api/getTask.php?selectedTaskId=${selectedTaskId}`);
      const datos = await taskInfo.json();
      console.log("Informacion Task",datos[0].name);
      boxtask.children[0].children[0].value = datos[0].title;
      boxtask.children[1].children[0].value = datos[0].iduser;

    botonSubir.innerText = "UPDATE";
    updatingTask = true;
  }
});
});