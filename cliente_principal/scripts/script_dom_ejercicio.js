window.onload = iniciar;

let selectedBlock = null; // Variable global para almacenar el bloque seleccionado

function iniciar() {
    // ponemos a todos los bloques el numero correspondiente
    const rootBlocks = document.querySelectorAll('.root-block');
    rootBlocks.forEach((rootBlock, index) => {
        const blockNumber = index + 1;
        rootBlock.setAttribute('data-path', blockNumber.toString());
        ponerLabel(rootBlock, blockNumber.toString());
        setupBlockListeners(rootBlock);
    });

    if(selectedBlock == null){
        rootBlocks[0].classList.add('selected');
        selectedBlock = rootBlocks[0];

        const blockPath = selectedBlock.getAttribute('data-path');
        change_info(`Bloque ${blockPath} seleccionado`);
    }

    // Configurar los botones globales
    const addChildBtn = document.getElementById('add-child-global');
    const deleteBtn = document.getElementById('delete-block-global');
    const moveUpBtn = document.getElementById('move-up-global');
    const firstChildBtn = document.getElementById('first-child-global');
    const lastChildBtn = document.getElementById('last-child-global');
    const nextSiblingBtn = document.getElementById('next-sibling-global');
    const prevSiblingBtn = document.getElementById('prev-sibling-global');

    moveUpBtn.addEventListener('click', () => {
        if (selectedBlock) {
            irAlPadre(selectedBlock);
        } else {
            alert('Selecciona un bloque primero');
        }
    });

    firstChildBtn.addEventListener('click', () => {
        if (selectedBlock) {
            irAlPrimerHijo(selectedBlock);
        } else {
            alert('Selecciona un bloque primero');
        }
    });

    lastChildBtn.addEventListener('click', () => {
        if (selectedBlock) {
            irAlUltimoHijo(selectedBlock);
        } else {
            alert('Selecciona un bloque primero');
        }
    });

    nextSiblingBtn.addEventListener('click', () => {
        if (selectedBlock) {
            irAlSiguienteHermano(selectedBlock);
        } else {
            alert('Selecciona un bloque primero');
        }
    });

    prevSiblingBtn.addEventListener('click', () => {
        if (selectedBlock) {
            irAlAnteriorHermano(selectedBlock);
        } else {
            alert('Selecciona un bloque primero');
        }
    });

    addChildBtn.addEventListener('click', () => {
        if (selectedBlock) {
            agregarHijo(selectedBlock);
        } else {
            alert('Selecciona un bloque primero');
        }
    });

    deleteBtn.addEventListener('click', () => {
        if (selectedBlock) {
            eliminarBloque(selectedBlock);
        } else {
            alert('Selecciona un bloque para eliminar');
        }
    });
}

//aqui metemos el listener a cada bloque para seleccionarlo
function setupBlockListeners(blockElement) {
    blockElement.addEventListener('click', e => {
        e.stopPropagation();
        
        // Deseleccionar el bloque anterior
        if (selectedBlock) {
            selectedBlock.classList.remove('selected');
        }
        
        // Seleccionar el nuevo bloque
        selectedBlock = blockElement;
        selectedBlock.classList.add('selected');
        
        const blockPath = blockElement.getAttribute('data-path');
        change_info(`Bloque ${blockPath} seleccionado`);
    });
}

function change_info(cadena){
    const infoElement = document.getElementById('selected-block-info');
    if (infoElement) {
        infoElement.textContent = cadena;
    }
}

function agregarHijo(blockElement) {
    const parentPath = blockElement.getAttribute('data-path');
    const childrenContainer = blockElement.querySelector('.children-container');
    
    const existingChildren = childrenContainer.querySelectorAll(':scope > .block').length;
    const childNumber = existingChildren + 1;
    //pillo la ruta del padre y le añado .número hijo
    const childPath = `${parentPath}.${childNumber}`;
    
    // const newBlock = createBlock(childPath);
    const block = document.createElement('div');
    block.className = 'block';
    block.setAttribute('data-path', childPath);

    const blockLabel = document.createElement('span');
    blockLabel.className = 'block-label';
    blockLabel.textContent = `Bloque ${childPath}`;

    const newChildrenContainer = document.createElement('div');
    newChildrenContainer.className = 'children-container';

    block.appendChild(blockLabel);
    block.appendChild(newChildrenContainer);

    const newBlock = block;

    childrenContainer.appendChild(newBlock);
    // no tiene limite igual deberia ponerle un maximo de 3 por ejemplo
    setupBlockListeners(newBlock);
}

function eliminarBloque(blockElement) {
    // No se puede eliminar un bloque raíz
    if (blockElement.classList.contains('root-block')) {
        alert('No puedes eliminar un bloque raíz');
        return;
    }
    
    blockElement.remove();
    selectedBlock = null;
}

function irAlPadre(blockElement) {
    // Encontrar el bloque padre
    const parentBlock = blockElement.parentElement.parentElement;
    if (!parentBlock || !parentBlock.classList.contains('block')) {
        alert('Este bloque no tiene padre');
        return;
    }
    
    // Deseleccionar el bloque actual
    if (selectedBlock) {
        selectedBlock.classList.remove('selected');
    }
    
    selectedBlock = parentBlock;
    selectedBlock.classList.add('selected');
    
    const blockPath = parentBlock.getAttribute('data-path');
    change_info(`Bloque ${blockPath} seleccionado`);
}

function irAlPrimerHijo(blockElement) {
    // Encontrar el primer hijo
    const childrenContainer = blockElement.querySelector('.children-container');
    // const firstChild = childrenContainer.querySelector(':scope > .block');
    const firstChild = childrenContainer.children[0];
    
    if (!firstChild) {
        alert('Este bloque no tiene hijos');
        return;
    }
    
    // Deseleccionar el bloque actual
    if (selectedBlock) {
        selectedBlock.classList.remove('selected');
    }
    
    // Seleccionar el primer hijo
    selectedBlock = firstChild;
    selectedBlock.classList.add('selected');
    
    const blockPath = firstChild.getAttribute('data-path');
    change_info(`Bloque ${blockPath} seleccionado`);
}

function irAlUltimoHijo(blockElement) {
    // Encontrar el último hijo
    const childrenContainer = blockElement.querySelector('.children-container');
    // const allChildren = childrenContainer.querySelectorAll(':scope > .block');
    // if (allChildren.length === 0) {
    //     alert('Este bloque no tiene hijos');
    //     return;
    // }
    
    // const lastChild = allChildren[allChildren.length - 1];
    const lastChild = childrenContainer.lastElementChild;
    
    // Deseleccionar el bloque actual
    if (selectedBlock) {
        selectedBlock.classList.remove('selected');
    }
    
    // Seleccionar el último hijo
    selectedBlock = lastChild;
    selectedBlock.classList.add('selected');
    
    const blockPath = lastChild.getAttribute('data-path');
    change_info(`Bloque ${blockPath} seleccionado`);
}

function irAlSiguienteHermano(blockElement) {
    const nextSibling = blockElement.nextElementSibling;
    
    if (!nextSibling || !nextSibling.classList.contains('block')) {
        alert('No hay siguiente hermano');
        return;
    }
    
    // Deseleccionar el bloque actual
    if (selectedBlock) {
        selectedBlock.classList.remove('selected');
    }
    
    // Seleccionar el siguiente hermano
    selectedBlock = nextSibling;
    selectedBlock.classList.add('selected');
    
    const blockPath = nextSibling.getAttribute('data-path');
    change_info(`Bloque ${blockPath} seleccionado`);
}

function irAlAnteriorHermano(blockElement) {
    const prevSibling = blockElement.previousElementSibling;
    
    if (!prevSibling || !prevSibling.classList.contains('block')) {
        alert('No hay anterior hermano');
        return;
    }
    
    // Deseleccionar el bloque actual
    if (selectedBlock) {
        selectedBlock.classList.remove('selected');
    }
    
    // Seleccionar el anterior hermano
    selectedBlock = prevSibling;
    selectedBlock.classList.add('selected');
    
    const blockPath = prevSibling.getAttribute('data-path');
    change_info(`Bloque ${blockPath} seleccionado`);
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