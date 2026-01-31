window.onload = iniciar;

function iniciar() {
    // ponemos a todos los bloques el numero correspondiente
    const rootBlocks = document.querySelectorAll('.root-block');
    rootBlocks.forEach((rootBlock, index) => {
        const blockNumber = index + 1;
        rootBlock.setAttribute('data-path', blockNumber.toString());
        ponerLabel(rootBlock, blockNumber.toString());
        setupBlockListeners(rootBlock, true); // si true es un bloque de los tres originales
    });
}

function setupBlockListeners(blockElement, isRoot = false) {
    const addChildBtn = blockElement.querySelector('.add-child-btn');
    const deleteBtn = blockElement.querySelector('.delete-btn');
    const childrenContainer = blockElement.querySelector('.children-container');

    addChildBtn.addEventListener('click', e => {
        e.stopPropagation();
        
        // pillamos el padre
        const parentPath = blockElement.getAttribute('data-path');
        
        // contamos los hijos del padre para saber que numero ponerle (esto lo saqué de internet por que vaya liada)
        const existingChildren = childrenContainer.querySelectorAll(':scope > .block').length;
        const childNumber = existingChildren + 1;
        const childPath = `${parentPath}.${childNumber}`;
        
        // le metemos al padre el nuevo hijo creado
        const newBlock = createBlock(childPath);
        childrenContainer.appendChild(newBlock);
        
        // para los nuevos le ponemos false para que se distingan con los originales
        setupBlockListeners(newBlock, false);
    });

    // si el nuevo bloque NO es uno original, le ponemos el boton de borrar
    if (!isRoot && deleteBtn) {
        deleteBtn.addEventListener('click', e => {
            e.stopPropagation();
            blockElement.remove();
        });
    }
}

function ponerLabel(blockElement, pathNumber) {
    let blockLabel = blockElement.querySelector('.block-label');
    if (!blockLabel) {
        blockLabel = document.createElement('span');
        blockLabel.className = 'block-label';
        blockElement.insertBefore(blockLabel, blockElement.firstChild);
    }
    blockLabel.textContent = `Bloque ${pathNumber}`;
}

function createBlock(path) {
    const block = document.createElement('div');
    block.className = 'block';
    block.setAttribute('data-path', path);

    const blockLabel = document.createElement('span');
    blockLabel.className = 'block-label';
    blockLabel.textContent = `Bloque ${path}`;

    const addChildBtn = document.createElement('button');
    addChildBtn.className = 'add-child-btn';
    addChildBtn.textContent = 'Añadir Hijo';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Eliminar Este y Sus Hijos';

    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'children-container';

    block.appendChild(blockLabel);
    block.appendChild(addChildBtn);
    block.appendChild(deleteBtn);
    block.appendChild(childrenContainer);

    return block;
}
