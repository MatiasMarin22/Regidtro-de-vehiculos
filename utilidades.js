const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('patente').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}

const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}

const verificar = (id) => {
    const input = document.getElementById(id) 
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid') 
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'fechaIngreso') {
            const fecha = new Date(input.value)
            const hoy = new Date()
            if (fecha > hoy) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha de ingreso no puede ser mayor que hoy</span>'
            }
        }
        if (id == 'run') {
            if (!validaRun(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El RUN no es válido</span>'
            }
        }
        if (id == 'email') {
            if (!validaEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
    }
}

const validaRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            let tmp = rutCompleto.split('-')
            let digv = tmp[1] 
            const rut = tmp[0] 
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}
