import {taskUpdate,deleteTask } from "../actions/domOperation.js";

export const addToDOM = (task) => {        
        let taskElem = document.createElement("div");
        taskElem.classList.add('todo-item');
        taskElem.id = task.taskId;
        taskElem.isEdited = false;
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.isCompleted;
        checkbox.prevStatus = task.isCompleted;
        checkbox.addEventListener('change',taskUpdate)

        let taskDesc = document.createElement("input");
        taskDesc.classList.add('todo-desc')
        taskDesc.disabled = "true";
        taskDesc.value = task.content;
        taskDesc.prevContent = task.content

        taskDesc.addEventListener('change' , ()=>{
            taskElem.isEdited =true;
        })
        
        if(checkbox.checked){
            taskDesc.style.textDecoration="line-through"
        }

        let btnEdit = document.createElement("i");
        btnEdit.classList.add("fa","fa-edit","btn-edit")
        btnEdit.addEventListener('click',taskUpdate)

        let btnDel = document.createElement("i");
        btnDel.classList.add("fa","fa-times","btn-del");
        btnDel.addEventListener('click',()=>{deleteTask(event.target.parentElement.id)})

        let taskLog = document.createElement("p");
        taskLog.innerText= task.createdAt;

        taskElem.appendChild(checkbox);
        taskElem.appendChild(taskDesc);
        taskElem.appendChild(btnDel);
        taskElem.appendChild(btnEdit);
        taskElem.appendChild(taskLog);
        taskList.appendChild(taskElem)
}

