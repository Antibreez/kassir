const cellLoader = {
  add: (cell) => {
    const loader = document.createElement('div');
    loader.classList.add('loader')
    loader.textContent = 'Loading...'
    loader.style.position = 'absolute';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.padding = '5px';
    loader.style.height = '100%';
    loader.style.width = '100%';
    loader.style.backgroundColor = '#fff';

    cell.appendChild(loader);
  },
  remove: (cell) => {
    const loader = cell.querySelector('.loader');
    loader.parentNode.removeChild(loader);
  }
}

export default cellLoader;
