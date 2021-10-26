var contador = 1
var pos = []
var countWish = 1

function savestorage(item) {
    localStorage.setItem(contador, item)
    this.pos.push(contador)
    alertOK('Disco añadido a la lista', "OK")
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

function getdata(update, key) {
    var disco = document.querySelector("#discos").value
    if (update) {
        localStorage.setItem(key, disco)
    } else {
        if (disco !== "Selecciona tu disco") {
            savestorage(disco)
            updatetable()
        } else {
            alertOK('No ha seleccionado un disco', "ERR")
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
    element = document.querySelector("#send-confirm")
    element.setAttribute("onclick", `confirmEdit(${key})`)
    element.innerHTML = "Confirmar"
}

function confirmEdit(key) {
    localStorage.setItem(key, item)
    getdata(true, key)
    element = document.querySelector("#send-confirm")
    element.setAttribute("onclick", "savelist()")
    element.value = "Agregar"
    this.updatetable()
    alertOK('Disco actualizado en la lista', "OK")
}

function sendwish() {
    var email = document.querySelector("#email").value
    var check = document.querySelector("#check").checked
    var discoswish = []
    if (this.pos.length > 0) {
        if (email.length > 6 && email.includes("@") && (email.includes(".com") || email.includes(".co"))) {
            if (check) {
                pos.forEach(element => {
                    var disc = localStorage.getItem(element)
                    discoswish.push(disc)
                });
                jsonsend = { email: email, check: check, disc: discoswish }
                cleanstorage()
                localStorage.setItem("emailWish_" + countWish, JSON.stringify(jsonsend))
                document.querySelector("#email").value = ''
                document.querySelector("#check").checked = false
                updatetable()
                alertOK('Deseos enviados al correo', "OK")
            } else {
                alertOK('Autorizacion de datos no seleccionada', "ERR")
            }
        } else {
            alertOK('Correo no valido', "ERR")
        }
    } else {
        alertOK('No hay lista de deseos, favor agrega a la lista', "ERR")
    }

}



function savelist() {
    this.getdata(false, 0)
}

function cleanstorage() {
    localStorage.clear()
    this.pos = []
}



function alertOK(message, tipe) {
    switch (tipe) {
        case "OK":
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1500
            })
            break;
        case "ERR":
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: message,
            })
            break;
        default:
            alert("Tipo de error no seleccionado")
    }
}
