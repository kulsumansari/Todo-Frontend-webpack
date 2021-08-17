import { addTask , delTask ,updateTask} from "../apiCalls/todoAPI.js";

todoForm.addEventListener('submit',(event) => {
    //client is offline
    if(navigator.onLine){
        event.preventDefault();
        let taskDesc = document.todoForm.task.value;
        if(taskDesc !== ''){
            let obj = {
                method: 'POST',
                body: JSON.stringify({
                    "content":taskDesc, 
                    "createdAt": getDate(),
                    "updatedAt": "none"
                }),
                headers: {
                    "Content-Type": "application/json"
                } 
            }
            addTask(obj)
            document.todoForm.task.value = '';
        }
    }else{
        alert('You are not connected to internet!')  
    }
});

todoForm.reset.addEventListener('click',() => {
    todoForm.task.value = ""
});

const getDate=()=>{
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    if (dd < 10) {
        dd = `${dd}`;
    }
    if (mm < 10) {
        mm = `${mm}`;
    }
    return `${date.getHours()}:${date.getHours()} ${dd}/${mm}/${date.getFullYear()}`;
}

export const taskUpdate =(event) =>{
    let id =event.target.parentElement.id;
    let parentDiv = document.getElementById(`${id}`)

    if(navigator.onLine){
        let input = parentDiv.querySelector('.todo-desc');
        let btnEdit = parentDiv.querySelector('.btn-edit');
        
        if(event.type === 'click'){
            input.disabled = false;
            input.focus();
            btnEdit.classList.remove('fa-edit');
            btnEdit.classList.add('fa-check');
            btnEdit.addEventListener('click',  edit)
        }
        if (event.type === 'change'){
            let checkBoxStatus = parentDiv.querySelector('input[type=checkbox]').checked;
            if(checkBoxStatus) input.style.textDecoration="line-through";
            else input.style.textDecoration="none";
            update(id, input.value ,parentDiv.querySelector('p').innerText, checkBoxStatus)
        }  
    }else{
        alert('You are not connected to internet!')  
        parentDiv.querySelector('input[type=checkbox]').checked = parentDiv.querySelector('input[type=checkbox]').prevStatus;
    }
}

const edit=(event)=>{
    let id =event.target.parentElement.id;
    let parentDiv = document.getElementById(`${id}`)
    let input = parentDiv.querySelector('.todo-desc');
    let btnEdit = parentDiv.querySelector('.btn-edit');

    let confirmMsg = confirm('Do You want to update task?');
        if( confirmMsg ){
            if(parentDiv.isEdited && input.value.length > 0){
                update(id, input.value , parentDiv.querySelector('p').innerText , parentDiv.querySelector('input[type=checkbox]').checked  )
                parentDiv.isEdited =false;
            }else{
                alert('invalid Input: Your content has not been changed or your task description is Empty!!')
            }
        }
   
    btnEdit.classList.remove('fa-check');
    btnEdit.classList.add('fa-edit');
    input.disabled = true;
    btnEdit.removeEventListener('click' , edit)
    btnEdit.addEventListener('click', taskUpdate ) ;
}

export const update = async (id,content,createdAt, isCompleted) =>{
    let obj = {
        method: 'POST',
        body: JSON.stringify({
            "content": content,
            "createdAt":createdAt,
            "updatedAt": getDate(),
            "isCompleted": isCompleted
        }),
        headers: {
            "Content-Type": "application/json"
        } 
    }
    await updateTask(id, obj)
} 


export const deleteTask = async (id) =>{
    if(navigator.onLine){
        let confirmMsg = confirm('Do You want to delete the task?');
        if( confirmMsg ){
            let obj = {
                method: 'DELETE',
            }
            await delTask(id ,obj)
        }
    }else{
        alert('You are not connected to internet!')  
    }
}