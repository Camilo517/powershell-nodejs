// Dependencias
const $ = require('jquery');
const powershell = require('node-powershell');
const dt = require('datatables.net')();
const dtbs = require('datatables.net-bs4')(window, $);
const express = require('express')
const app = express()

// Variables
let remote = require('electron').remote;

// Comillas
String.prototype.wrap = function () {
    return `'${this}'`;
}


$("#ping").click(() => {
	
	    // Obtenemos la informacion del input
    let computer1 = $('#ip').val() || 'localhost'
	let computer2 = $('#nombre1').val() || 'ping.txt'

	
    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

	let commands = [{ ComputerName: computer1.wrap() }]

	
	
	ps.addCommand(' Test-NetConnection ' + computer1 + ' | Out-file ' + computer2 + ' -append')



ps.invoke()
.then(function (output) {
    console.log(output)
})
.catch(function (err) {
    console.log(err)
    ps.dispose()
})
})





$("#ssh").click(() => {
	
	    // Obtenemos la informacion del input
    let computer1 = $('#ip5').val() || 'localhost'

	
    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

	let commands = [{ ComputerName: computer1.wrap() }]

	
	
	ps.addCommand(' New-SSHSession -ComputerName ' + computer1 + ' -Credential (Get-Credential) | out-file conexionsshejecutada.txt ')

	


ps.invoke()
.then(function (output) {
    console.log(output)
})
.catch(function (err) {
    console.log(err)
    ps.dispose()
})
})





$("#comprimir").click(() => {
	
	    // Obtenemos la informacion del input
    let computer1 = $('#origenc').val() || 'localhost'
	let computer2 = $('#destinoc').val() || 'archivo.zip'

	
    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

	let commands = [{ ComputerName: computer1.wrap() }]

	
	
	ps.addCommand(' Compress-Archive -Path ' + computer1 + ' -DestinationPath  '  + computer2)


ps.invoke()
.then(function (output) {
    console.log(output)
})
.catch(function (err) {
    console.log(err)
    ps.dispose()
})
})



$("#copy").click(() => {
	
	    // Obtenemos la informacion del input
    let computer1 = $('#origen').val() || 'localhost'
	let computer2 = $('#destino').val() || 'localhost'

	
    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

	let commands = [{ ComputerName: computer1.wrap() }]

	
	
	ps.addCommand(' Copy-Item ' + computer1 + ' -Destination '  + computer2)

ps.invoke()
.then(function (output) {
    console.log(output)
})
.catch(function (err) {
    console.log(err)
    ps.dispose()
})
})


$("#command1").click(() => {
	
	    // Obtenemos la informacion del input
    let computer1 = $('#command').val() || 'localhost'
	let computer2 = $('#nombre').val() || 'localhost'

	
    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

	let commands = [{ ComputerName: computer1.wrap() }]


  ps.addCommand(computer1 + ' | Out-file ' + computer2 + ' -append')

ps.invoke()
.then(function (output) {
    console.log(output)
})
.catch(function (err) {
    console.log(err)
    ps.dispose()
})
})


//Boton 1

$("#getDisk").click(() => {
	
    // Obtenemos la informacion del input
    let computer = $('#computerName').val() || 'localhost'

    // Mensajes
    $('.alert-danger .message').html("")
    $('.alert-danger').hide()

    // Instancia de powershell
    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

	let commands = [{ ComputerName: computer.wrap() }]
	

	
    // Cargamos script
    let scriptPath = require("path").resolve(__dirname, './1.ps1')
    ps.addCommand(scriptPath, commands)
	

    // Mostramos
    ps.invoke()
    .then(output => {
        console.log(output)
        let data = JSON.parse(output)
        console.log(data)

        // Errores jquery
        if (data.Error) {
            $('.alert-danger .message').html(data.Error.Message)
            $('.alert-danger').show()
            return
        }

        // Generamos formato tabla
        let columns = [];
        Object.keys(data[0]).forEach( key => columns.push({ title: key, data: key }) )
        console.log(columns)

        $('#output').DataTable({
            data: data,
            columns: columns,
            paging: false,
            searching: false,
            info: false,
            destroy: true
        });
    })
    .catch(err => {
        console.error(err)
        $('.alert-danger .message').html(err)
        $('.alert-danger').show()
        ps.dispose()
    })

})

$("#getDisk1").click(() => {

    let computer = $('#computerName').val() || 'localhost'


    $('.alert-danger .message').html("")
    $('.alert-danger').hide()


    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

    let commands = [{ ComputerName: computer.wrap() }]
    

    let scriptPath = require("path").resolve(__dirname, './2.ps1')
    ps.addCommand(scriptPath, commands)


    ps.invoke()
    .then(output => {
        console.log(output)
        let data = JSON.parse(output)
        console.log(data)


        if (data.Error) {
            $('.alert-danger .message').html(data.Error.Message)
            $('.alert-danger').show()
            return
        }


        let columns = [];
        Object.keys(data[0]).forEach( key => columns.push({ title: key, data: key }) )
        console.log(columns)

        $('#output').DataTable({
            data: data,
            columns: columns,
            paging: false,
            searching: false,
            info: false,
            destroy: true  
        });
    })
    .catch(err => {
        console.error(err)
        $('.alert-danger .message').html(err)
        $('.alert-danger').show()
        ps.dispose()
    })

})

$("#getDisk2").click(() => {

    let computer = $('#computerName').val() || 'localhost'


    $('.alert-danger .message').html("")
    $('.alert-danger').hide()


    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

    let commands = [{ ComputerName: computer.wrap() }]
    

    let scriptPath = require("path").resolve(__dirname, './3.ps1')
    ps.addCommand(scriptPath, commands)


    ps.invoke()
    .then(output => {
        console.log(output)
        let data = JSON.parse(output)
        console.log(data)


        if (data.Error) {
            $('.alert-danger .message').html(data.Error.Message)
            $('.alert-danger').show()
            return
        }


        let columns = [];
        Object.keys(data[0]).forEach( key => columns.push({ title: key, data: key }) )
        console.log(columns)

        $('#output').DataTable({
            data: data,
            columns: columns,
            paging: false,
            searching: false,
            info: false,
            destroy: true
        });
    })
    .catch(err => {
        console.error(err)
        $('.alert-danger .message').html(err)
        $('.alert-danger').show()
        ps.dispose()
    })

})
$("#getDisk3").click(() => {

    let computer = $('#computerName').val() || 'localhost'


    $('.alert-danger .message').html("")
    $('.alert-danger').hide()


    let ps = new powershell({
        executionPolicy: 'Bypass',
        noProfile: true
    })

    let commands = [{ ComputerName: computer.wrap() }]
    

    let scriptPath = require("path").resolve(__dirname, './4.ps1')
    ps.addCommand(scriptPath, commands)


    ps.invoke()
    .then(output => {
        console.log(output)
        let data = JSON.parse(output)
        console.log(data)


        if (data.Error) {
            $('.alert-danger .message').html(data.Error.Message)
            $('.alert-danger').show()
            return
        }


        let columns = [];
        Object.keys(data[0]).forEach( key => columns.push({ title: key, data: key }) )
        console.log(columns)

        $('#output').DataTable({
            data: data,
            columns: columns,
            paging: false,
            searching: false,
            info: false,
            destroy: true  // or retrieve
        });
    })
    .catch(err => {
        console.error(err)
        $('.alert-danger .message').html(err)
        $('.alert-danger').show()
        ps.dispose()
    })

})

