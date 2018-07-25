const escpos = require('escpos')

class Printer {
  constructor(devRoute){
    this.device = new escpos.Serial(devRoute, {
      baudRate: 115200,
      stopBit: 2
    })
    this.printer = new escpos.Printer(this.device)
  }

  config(){
    return this.printer
      .font('a')
      .align('lt')
      .style('bu')
      .size(1, 1)
  }

  printInstructions(messages){
    this.device.open((err) => {
      this.printer = this.config()
      messages.map((text) => this.printer.text(text))
      this.printer.close()
    })
  }

  printError(message){
    this.device.open((err) => {
      this.printer.text(text)
      this.printer.close()
    })
  }
}

module.exports = Printer
