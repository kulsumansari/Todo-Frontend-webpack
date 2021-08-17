import { getTodos } from "./apiCalls/todoAPI.js";
import "../style/style.css"
import {addImage} from "./components/todo-image.js"
import todoImg from '../assets/todoImg.png'

addImage(todoImg)
window.onload = function(event) {
    getTodos();
}
