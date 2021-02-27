export const commercialDetail = (commercial) => {
  let deleteButtonHTML = '';
  if(commercial.canBeDeleted){
    deleteButtonHTML = '<button class = "button is-danger">Borrar</button>';
  }
  
  let imgHTML = '';
  if(commercial.image){
    imgHTML = `
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="${commercial.image}" alt="Placeholder image">
      </figure>
    </div>`
  }

  let type;
  if (commercial.type){
    type = 'Compra'
  }else{
    type = 'Venta'
  }
  
  return `<div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">${commercial.articulo}</p>
        </div>
      </div>
      <div class="content">
        <p>${commercial.description}</p>
        <br>
        <p>${commercial.price}</p>
        <br>
        <p>${type}</p>
        <br>
        ${deleteButtonHTML}
      </div>
    </div>
    ${imgHTML}
  </div>`;
};
