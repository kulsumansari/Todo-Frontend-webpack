import { addToDOM } from "../components/task.js";

const url = "https://todo-backend-switch-mode.herokuapp.com/tasks";

export const getTodos=()=>{
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((res) => {
        let Tasks = res.data;
        Tasks.forEach(task => {
            addToDOM(task)
        });
    })
    .catch((err)=>{
        //Server is offline
        alert(`Error while fetching tasks : ${err.message}!`)
    });
}

export const addTask = (obj)=>{
    fetch(url,obj)
    .then((response)=>{
        return response.json();
    })
    .then((res) => {
        let task = res.data;
        addToDOM(task)
    })
    .catch((err)=>{
        // server is offline
        alert(`Error while Creating task : Failed to create new task!`)
    });
}

export const updateTask = (id, obj)=>{
    fetch(`${url}/${id}`,obj)
    .then((response)=>{
        return response.json()
    })
    .then((res)=>{
        document.getElementById(`${id}`).querySelector('.todo-desc').prevContent = res.data.content;
        document.getElementById(`${id}`).querySelector('input[type=checkbox').prevStatus = res.data.isCompleted;
    })
    .catch((err)=>{
        // server is offline
        document.getElementById(`${id}`).querySelector('.todo-desc').value = document.getElementById(`${id}`).querySelector('.todo-desc').prevContent;
        let chkBox = document.getElementById(`${id}`).querySelector('input[type=checkbox]')
        chkBox.checked = chkBox.prevStatus;
        
        if(!chkBox.checked)
            document.getElementById(`${id}`).querySelector('.todo-desc').style.textDecoration = "none";
        else
            document.getElementById(`${id}`).querySelector('.todo-desc').style.textDecoration = "line-through";
        
        alert(`Error while Updating task : Failed to update task!`)
    });
}

export const delTask = (id ,obj) =>{
    fetch(`${url}/${id}`,obj)
    .then((response)=>{
        if(response.status === 204){
            document.getElementById(`${id}`).remove();
        }
    })
    .catch((err)=>{
        // server is offline
        alert(`Error while Deleting task : Failed to delete task!`)
    });
}
