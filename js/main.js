var contador = 1
var pos = []

function savestorage(item) {
    localStorage.setItem(contador, item)
    this.pos.push(contador)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Disco añadido a la lista',
        showConfirmButton: false,
        timer: 1500
    })
    contador++
}

function updatetable() {
    tablestorage = document.querySelector('#datastorage')
    tablestorage.innerHTML = ''
    for (i = 0; i < pos.length; i++) {
        item = localStorage.getItem(this.pos[i]);
        tablestorage.innerHTML +=
            `
        <tr>
            <td>${item}</td>
            <td>
                <div class="btn-group" role="group" aria-label="">
                    <button type="button" class="btn btn-info" onclick="editdisc(${this.pos[i]})">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="deletedisc(${this.pos[i]})">Eliminar</button>
                </div>
            </td>
        </tr>
    `
    }
}

function getdata(update,key) {
    var disco = document.querySelector("#discos").value
    if (update) {
        localStorage.setItem(key, disco)
    } else {
        if (disco !== "Selecciona tu disco") {
            savestorage(disco)
            updatetable()
        } else {
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: 'No ha seleccionado un disco',
            })
        }      
    }
    document.querySelector("#discos").value = "Selecciona tu disco"
}

function deletedisc(key) {
    Swal.fire({
        title: 'Desea realmente eliminar este disco de su lista de deseos?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Disco Eliminado', '', 'success')
            localStorage.removeItem(key)
            lugar = this.pos.indexOf(key)
            this.pos.splice(lugar, 1)
            this.updatetable()
        } else if (result.isDenied) {
            Swal.fire('Deseo de disco no eliminado', '', 'info')
        }
    })

}

function editdisc(key) {
    document.querySelector("#discos").value = localStorage.getItem(key)
    element =document.querySelector("#send-confirm")
    element.setAttribute("onclick",`confirmEdit(${key})`)
    element.innerHTML="Confirmar"
}

function confirmEdit(key) {
    localStorage.setItem(key, item)
    getdata(true,key)
    element =document.querySelector("#send-confirm")
    element.setAttribute("onclick","mostrar()")
    element.value="Agregar"
    this.updatetable()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Disco actualizado en la lista',
        showConfirmButton: false,
        timer: 1500
    })
}

function mostrar() {
    getdata(false,0)
}





