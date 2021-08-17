/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/todoImg.png":
/*!****************************!*\
  !*** ./assets/todoImg.png ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"assets/d460659a82d28551fc079943fa4c66da.png\");\n\n//# sourceURL=webpack://todo-client-webpack/./assets/todoImg.png?");

/***/ }),

/***/ "./style/style.css":
/*!*************************!*\
  !*** ./style/style.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://todo-client-webpack/./style/style.css?");

/***/ }),

/***/ "./src/actions/domOperation.js":
/*!*************************************!*\
  !*** ./src/actions/domOperation.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskUpdate\": () => (/* binding */ taskUpdate),\n/* harmony export */   \"update\": () => (/* binding */ update),\n/* harmony export */   \"deleteTask\": () => (/* binding */ deleteTask)\n/* harmony export */ });\n/* harmony import */ var _apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apiCalls/todoAPI.js */ \"./src/apiCalls/todoAPI.js\");\n\n\ntodoForm.addEventListener('submit',(event) => {\n    //client is offline\n    if(navigator.onLine){\n        event.preventDefault();\n        let taskDesc = document.todoForm.task.value;\n        if(taskDesc !== ''){\n            let obj = {\n                method: 'POST',\n                body: JSON.stringify({\n                    \"content\":taskDesc, \n                    \"createdAt\": getDate(),\n                    \"updatedAt\": \"none\"\n                }),\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                } \n            }\n            ;(0,_apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(obj)\n            document.todoForm.task.value = '';\n        }\n    }else{\n        alert('You are not connected to internet!')  \n    }\n});\n\ntodoForm.reset.addEventListener('click',() => {\n    todoForm.task.value = \"\"\n});\n\nconst getDate=()=>{\n    var date = new Date();\n    var dd = date.getDate();\n    var mm = date.getMonth() + 1;\n    if (dd < 10) {\n        dd = `${dd}`;\n    }\n    if (mm < 10) {\n        mm = `${mm}`;\n    }\n    return `${date.getHours()}:${date.getHours()} ${dd}/${mm}/${date.getFullYear()}`;\n}\n\nconst taskUpdate =(event) =>{\n    let id =event.target.parentElement.id;\n    let parentDiv = document.getElementById(`${id}`)\n\n    if(navigator.onLine){\n        let input = parentDiv.querySelector('.todo-desc');\n        let btnEdit = parentDiv.querySelector('.btn-edit');\n        \n        if(event.type === 'click'){\n            input.disabled = false;\n            input.focus();\n            btnEdit.classList.remove('fa-edit');\n            btnEdit.classList.add('fa-check');\n            btnEdit.addEventListener('click',  edit)\n        }\n        if (event.type === 'change'){\n            let checkBoxStatus = parentDiv.querySelector('input[type=checkbox]').checked;\n            if(checkBoxStatus) input.style.textDecoration=\"line-through\";\n            else input.style.textDecoration=\"none\";\n            update(id, input.value ,parentDiv.querySelector('p').innerText, checkBoxStatus)\n        }  \n    }else{\n        alert('You are not connected to internet!')  \n        parentDiv.querySelector('input[type=checkbox]').checked = parentDiv.querySelector('input[type=checkbox]').prevStatus;\n    }\n}\n\nconst edit=(event)=>{\n    let id =event.target.parentElement.id;\n    let parentDiv = document.getElementById(`${id}`)\n    let input = parentDiv.querySelector('.todo-desc');\n    let btnEdit = parentDiv.querySelector('.btn-edit');\n\n    let confirmMsg = confirm('Do You want to update task?');\n        if( confirmMsg ){\n            if(parentDiv.isEdited && input.value.length > 0){\n                update(id, input.value , parentDiv.querySelector('p').innerText , parentDiv.querySelector('input[type=checkbox]').checked  )\n                parentDiv.isEdited =false;\n            }else{\n                alert('invalid Input: Your content has not been changed or your task description is Empty!!')\n            }\n        }\n   \n    btnEdit.classList.remove('fa-check');\n    btnEdit.classList.add('fa-edit');\n    input.disabled = true;\n    btnEdit.removeEventListener('click' , edit)\n    btnEdit.addEventListener('click', taskUpdate ) ;\n}\n\nconst update = async (id,content,createdAt, isCompleted) =>{\n    let obj = {\n        method: 'POST',\n        body: JSON.stringify({\n            \"content\": content,\n            \"createdAt\":createdAt,\n            \"updatedAt\": getDate(),\n            \"isCompleted\": isCompleted\n        }),\n        headers: {\n            \"Content-Type\": \"application/json\"\n        } \n    }\n    await (0,_apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(id, obj)\n} \n\n\nconst deleteTask = async (id) =>{\n    if(navigator.onLine){\n        let confirmMsg = confirm('Do You want to delete the task?');\n        if( confirmMsg ){\n            let obj = {\n                method: 'DELETE',\n            }\n            await (0,_apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__.delTask)(id ,obj)\n        }\n    }else{\n        alert('You are not connected to internet!')  \n    }\n}\n\n//# sourceURL=webpack://todo-client-webpack/./src/actions/domOperation.js?");

/***/ }),

/***/ "./src/apiCalls/todoAPI.js":
/*!*********************************!*\
  !*** ./src/apiCalls/todoAPI.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getTodos\": () => (/* binding */ getTodos),\n/* harmony export */   \"addTask\": () => (/* binding */ addTask),\n/* harmony export */   \"updateTask\": () => (/* binding */ updateTask),\n/* harmony export */   \"delTask\": () => (/* binding */ delTask)\n/* harmony export */ });\n/* harmony import */ var _components_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/task.js */ \"./src/components/task.js\");\n\n\nconst url = \"https://todolist-backend-server.herokuapp.com/tasks\";\n\nconst getTodos=()=>{\n    fetch(url)\n    .then((response)=>{\n        return response.json();\n    })\n    .then((res) => {\n        let Tasks = res.data;\n        Tasks.forEach(task => {\n            (0,_components_task_js__WEBPACK_IMPORTED_MODULE_0__.addToDOM)(task)\n        });\n    })\n    .catch((err)=>{\n        //Server is offline\n        alert(`Error while fetching tasks : ${err.message}!`)\n    });\n}\n\nconst addTask = (obj)=>{\n    fetch(url,obj)\n    .then((response)=>{\n        return response.json();\n    })\n    .then((res) => {\n        let task = res.data;\n        (0,_components_task_js__WEBPACK_IMPORTED_MODULE_0__.addToDOM)(task)\n    })\n    .catch((err)=>{\n        // server is offline\n        alert(`Error while Creating task : Failed to create new task!`)\n    });\n}\n\nconst updateTask = (id, obj)=>{\n    fetch(`${url}/${id}`,obj)\n    .then((response)=>{\n        return response.json()\n    })\n    .then((res)=>{\n        document.getElementById(`${id}`).querySelector('.todo-desc').prevContent = res.data.content;\n        document.getElementById(`${id}`).querySelector('input[type=checkbox').prevStatus = res.data.isCompleted;\n    })\n    .catch((err)=>{\n        // server is offline\n        document.getElementById(`${id}`).querySelector('.todo-desc').value = document.getElementById(`${id}`).querySelector('.todo-desc').prevContent;\n        let chkBox = document.getElementById(`${id}`).querySelector('input[type=checkbox]')\n        chkBox.checked = chkBox.prevStatus;\n        \n        if(!chkBox.checked)\n            document.getElementById(`${id}`).querySelector('.todo-desc').style.textDecoration = \"none\";\n        else\n            document.getElementById(`${id}`).querySelector('.todo-desc').style.textDecoration = \"line-through\";\n        \n        alert(`Error while Updating task : Failed to update task!`)\n    });\n}\n\nconst delTask = (id ,obj) =>{\n    fetch(`${url}/${id}`,obj)\n    .then((response)=>{\n        if(response.status === 204){\n            document.getElementById(`${id}`).remove();\n        }\n    })\n    .catch((err)=>{\n        // server is offline\n        alert(`Error while Deleting task : Failed to delete task!`)\n    });\n}\n\n\n//# sourceURL=webpack://todo-client-webpack/./src/apiCalls/todoAPI.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiCalls/todoAPI.js */ \"./src/apiCalls/todoAPI.js\");\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/style.css */ \"./style/style.css\");\n/* harmony import */ var _components_todo_image_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/todo-image.js */ \"./src/components/todo-image.js\");\n/* harmony import */ var _assets_todoImg_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/todoImg.png */ \"./assets/todoImg.png\");\n\n\n\n\n\n(0,_components_todo_image_js__WEBPACK_IMPORTED_MODULE_2__.addImage)(_assets_todoImg_png__WEBPACK_IMPORTED_MODULE_3__.default)\nwindow.onload = function(event) {\n    ;(0,_apiCalls_todoAPI_js__WEBPACK_IMPORTED_MODULE_0__.getTodos)();\n}\n\n\n//# sourceURL=webpack://todo-client-webpack/./src/app.js?");

/***/ }),

/***/ "./src/components/task.js":
/*!********************************!*\
  !*** ./src/components/task.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addToDOM\": () => (/* binding */ addToDOM)\n/* harmony export */ });\n/* harmony import */ var _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/domOperation.js */ \"./src/actions/domOperation.js\");\n\n\nconst addToDOM = (task) => {        \n        let taskElem = document.createElement(\"div\");\n        taskElem.classList.add('todo-item');\n        taskElem.id = task.taskId;\n        taskElem.isEdited = false;\n        \n        let checkbox = document.createElement(\"input\");\n        checkbox.type = \"checkbox\";\n        checkbox.checked = task.isCompleted;\n        checkbox.prevStatus = task.isCompleted;\n        checkbox.addEventListener('change',_actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.taskUpdate)\n\n        let taskDesc = document.createElement(\"input\");\n        taskDesc.classList.add('todo-desc')\n        taskDesc.disabled = \"true\";\n        taskDesc.value = task.content;\n        taskDesc.prevContent = task.content\n\n        taskDesc.addEventListener('change' , ()=>{\n            taskElem.isEdited =true;\n        })\n        \n        if(checkbox.checked){\n            taskDesc.style.textDecoration=\"line-through\"\n        }\n\n        let btnEdit = document.createElement(\"i\");\n        btnEdit.classList.add(\"fa\",\"fa-edit\",\"btn-edit\")\n        btnEdit.addEventListener('click',_actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.taskUpdate)\n\n        let btnDel = document.createElement(\"i\");\n        btnDel.classList.add(\"fa\",\"fa-times\",\"btn-del\");\n        btnDel.addEventListener('click',()=>{(0,_actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(event.target.parentElement.id)})\n\n        let taskLog = document.createElement(\"p\");\n        taskLog.innerText= task.createdAt;\n\n        taskElem.appendChild(checkbox);\n        taskElem.appendChild(taskDesc);\n        taskElem.appendChild(btnDel);\n        taskElem.appendChild(btnEdit);\n        taskElem.appendChild(taskLog);\n        taskList.appendChild(taskElem)\n}\n\n\n\n//# sourceURL=webpack://todo-client-webpack/./src/components/task.js?");

/***/ }),

/***/ "./src/components/todo-image.js":
/*!**************************************!*\
  !*** ./src/components/todo-image.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addImage\": () => (/* binding */ addImage)\n/* harmony export */ });\n\nconst addImage = (img) => {\n    var image = document.createElement('img');\n    image.src = img;\n    let div = document.querySelector('.container');\n    div.prepend(image)\n}\n\n//# sourceURL=webpack://todo-client-webpack/./src/components/todo-image.js?");

/***/ })

/******/ 	});
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;