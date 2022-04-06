window.addEventListener('load', () => {
    const formCrear = document.getElementById('form-crear');
    const listaTareas = document.getElementById('lista-tareas');
    const inputCrear = document.getElementById('crear');
    const inputBuscar = document.getElementById('buscar');

    //Procedimiento para el ALTA

    formCrear.addEventListener('submit' , (e) => {
        e.preventDefault(); //evitamos que se recargue la pagina
        capturarValor();
        inputCrear.value = '';
    })

    const capturarValor = () => {
        const tareaNombre = inputCrear.value.trim();
        (tareaNombre.length) ? mostrarTareaHTML(tareaNombre) : Swal.fire({ title: 'Ups! Something is wrong',text: 'Enter any task',icon: 'info',confirmButtonText: 'Accept'
          })
    }

    const mostrarTareaHTML = (tarea) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Task successfully added'
          })

        const liHTML = `<li><strong>${tarea}</strong><i class="fas fa-minus-circle borrar"></i></li>`
        listaTareas.innerHTML += liHTML;
    }

    //PROCEDIMIENTO PARA BUSCAR con KEYUP (cuando la tecla se suelta)

    inputBuscar.addEventListener('keyup', ()=> {
        const caracter = inputBuscar.value.trim();
        busqueda(caracter);
    })

    const busqueda = (cadena) => {
        //console.log(listaTareas.children)
        let arreglo = Array.from(listaTareas.children);
        arreglo
            .filter(texto => !texto.textContent.toLowerCase().includes(cadena))
            .forEach(cadenaFiltrada => {
                cadenaFiltrada.classList.add('textoFiltrado')
            })
        arreglo
            .filter(texto => texto.textContent.toLowerCase().includes(cadena))
            .forEach(cadenaFiltrada => {
                cadenaFiltrada.classList.remove('textoFiltrado')
            })
    }

    //Procedimiento para borrar

    listaTareas.addEventListener('click', (e) => {
        if (e.target.classList.contains('borrar')) {
            e.target.parentElement.remove()
            
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Task successfully deleted'
            })
        }
        inputBuscar.value = '';

    })
})
