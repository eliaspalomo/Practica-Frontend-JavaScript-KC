export const commercialView = (commercial) => {
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
          <p class="title is-4">${commercial.name}</p>
        </div>
      </div>
      <div class="content">
        <p>${commercial.price}</p>
        <br>
        <p>${type}</p>
        <br>
      </div>
    </div>
    ${imgHTML}
  </div>`;
};

export const noCommercial = () => {
  return `<div>
    No hay anuncios
  </div>`;

}