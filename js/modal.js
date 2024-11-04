////////////////////////////////////////////
/////////// Interacción del Modal //////////
////////////////////////////////////////////

// abrir modal
function openModal() {
    dialogVictoria.showModal();
}

// cerrar modal
function closeModal() {
    dialogVictoria.close();
}

// Cerrar modal al hacer click fuera de él
dialogVictoria.addEventListener("click", e => {
    const dialogDimensions = dialogVictoria.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
        ) {
        closeModal();
    }
})

