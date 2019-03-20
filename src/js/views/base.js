//for reused and recycled dom elements and styles

export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list'),
  searchResPages: document.querySelector('.results__pages')
};

export const elementStrings = {
  loader: 'loader'
}

//add a loader img to the dom and choose where to put it with parent param
export const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
}

//removes the loader after all loading recipes stops
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    //how you remove a child. You go to the parentElement then removeChild
    loader.parentElement.removeChild(loader);
  }
}