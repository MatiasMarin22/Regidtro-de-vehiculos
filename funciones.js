import { edit, getData, remove, save, selectOne } from "./firestore.js"
let id = 0
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
            const vehiculo = {
                patente: document.getElementById('patente').value,
                modelo: document.getElementById('modelo').value.trim(),
                marca: document.getElementById('marca').value.trim(),
                run: document.getElementById('run').value,
                nombre: document.getElementById('nombre').value.trim(),
                fechaIngreso: document.getElementById('fechaIngreso').value,
                fechaSalida: document.getElementById('fechaSalida').value
            }
            if (document.getElementById('btnGuardar').value == 'Guardar') {
                save(vehiculo)
            } 
            else{
                edit(id,vehiculo)
                id = 0
            }
            limpiar()
        }
    }
)

window.addEventListener('DOMContentLoaded', () => { 
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
            const item = doc.data()

            tabla += `<tr>
            <td>${item.patente}</td>
            <td>${item.modelo}</td>
            <td>${item.marca}</td>
            <td>${item.run}</td>
            <td>${item.nombre}</td>
            <td>${item.fechaIngreso}</td>
            <td>${item.fechaSalida}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado!",
                            icon: "success"
                        })
                    }
                })
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const vehiculo = await selectOne(btn.id)
                const v = vehiculo.data()
                document.getElementById('patente').value = v.patente
                document.getElementById('modelo').value = v.modelo
                document.getElementById('marca').value = v.marca
                document.getElementById('run').value = v.run
                document.getElementById('nombre').value = v.nombre
                document.getElementById('fechaIngreso').value = v.fechaIngreso
                document.getElementById('fechaSalida').value = v.fechaSalida
                document.getElementById('btnGuardar').value = 'Editar'
                document.getElementById('patente').readOnly = true
                id = vehiculo.id
            })
        })
    })
})
