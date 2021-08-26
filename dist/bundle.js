/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTodos": () => (/* binding */ getTodos),
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "updateTask": () => (/* binding */ updateTask),
/* harmony export */   "delTask": () => (/* binding */ delTask)
/* harmony export */ });
/* harmony import */ var _components_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const url = "https://todo-backend-switch-mode.herokuapp.com/tasks";

const getTodos=()=>{
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((res) => {
        let Tasks = res.data;
        Tasks.forEach(task => {
            (0,_components_task_js__WEBPACK_IMPORTED_MODULE_0__.addToDOM)(task)
        });
    })
    .catch((err)=>{
        //Server is offline
        alert(`Error while fetching tasks : ${err.message}!`)
    });
}

const addTask = (obj)=>{
    fetch(url,obj)
    .then((response)=>{
        return response.json();
    })
    .then((res) => {
        let task = res.data;
        (0,_components_task_js__WEBPACK_IMPORTED_MODULE_0__.addToDOM)(task)
    })
    .catch((err)=>{
        // server is offline
        alert(`Error while Creating task : Failed to create new task!`)
    });
}

const updateTask = (id, obj)=>{
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

const delTask = (id ,obj) =>{
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


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToDOM": () => (/* binding */ addToDOM)
/* harmony export */ });
/* harmony import */ var _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const addToDOM = (task) => {        
        let taskElem = document.createElement("div");
        taskElem.classList.add('todo-item');
        taskElem.id = task.taskId;
        taskElem.isEdited = false;
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.isCompleted;
        checkbox.prevStatus = task.isCompleted;
        checkbox.addEventListener('change',_actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.taskUpdate)

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
        btnEdit.addEventListener('click',_actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.taskUpdate)

        let btnDel = document.createElement("i");
        btnDel.classList.add("fa","fa-times","btn-del");
        btnDel.addEventListener('click',()=>{(0,_actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(event.target.parentElement.id)})

        let taskLog = document.createElement("p");
        taskLog.innerText= task.createdAt;

        taskElem.appendChild(checkbox);
        taskElem.appendChild(taskDesc);
        taskElem.appendChild(btnDel);
        taskElem.appendChild(btnEdit);
        taskElem.appendChild(taskLog);
        taskList.appendChild(taskElem)
}



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskUpdate": () => (/* binding */ taskUpdate),
/* harmony export */   "update": () => (/* binding */ update),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask)
/* harmony export */ });
/* harmony import */ var _apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
            ;(0,_apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(obj)
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

const taskUpdate =(event) =>{
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

const update = async (id,content,createdAt, isCompleted) =>{
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
    await (0,_apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(id, obj)
} 


const deleteTask = async (id) =>{
    if(navigator.onLine){
        let confirmMsg = confirm('Do You want to delete the task?');
        if( confirmMsg ){
            let obj = {
                method: 'DELETE',
            }
            await (0,_apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__.delTask)(id ,obj)
        }
    }else{
        alert('You are not connected to internet!')  
    }
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addImage": () => (/* binding */ addImage)
/* harmony export */ });

const addImage = (img) => {
    var image = document.createElement('img');
    image.src = img;
    let div = document.querySelector('.container');
    div.prepend(image)
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/d460659a82d28551fc079943fa4c66da.png");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _components_todo_image_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _assets_todoImg_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





(0,_components_todo_image_js__WEBPACK_IMPORTED_MODULE_2__.addImage)(_assets_todoImg_png__WEBPACK_IMPORTED_MODULE_3__.default)
window.onload = function(event) {
    ;(0,_apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__.getTodos)();
}

})();

/******/ })()
;