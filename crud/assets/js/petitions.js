export async function getAllUsers(){
    const resp = await fetch("api/getUsers.php");
    const json = await resp.json(); 

    console.log(json);
    
    return json;
}


export async function getAllTasks(){
    const resp = await fetch("api/getTasks.php");
    const json = await resp.json(); 
    console.log(json);

    return json;
}


export async function createTask(formData) {
    await fetch('api/createTask.php', {
        method: 'POST',
        body: formData
    });

}


export async function deleteTask(taskId) {
const formData = new FormData();
formData.append('taskId', taskId);

await fetch('api/deleteTask.php', {
    method: 'POST',
    body: formData
});

}

export async function updateTask(formData,id) {
await fetch(`api/updateTask.php?id=${id}`, {
     method: 'POST',
    body: formData
});
}