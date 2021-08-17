
export const addImage = (img) => {
    var image = document.createElement('img');
    image.src = img;
    let div = document.querySelector('.container');
    div.prepend(image)
}