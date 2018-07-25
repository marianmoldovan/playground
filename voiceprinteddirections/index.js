const Printer = require('./printer')
const maps = require('./maps')

const printer = new Printer('/dev/tty.BlueToothPrinter-Serial')

var from = 'Avenida de burgos 16D'
var to = 'Calle Bronce 14'

maps.getInstructions(from, to).then(printer.printInstructions).catch(printer.printError)
