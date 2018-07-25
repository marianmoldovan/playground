const rp = require('request-promise')
const striptags = require('striptags')
const accents = require('remove-accents')

function clean(text){
  return accents.remove(striptags(text))
}

module.exports.getInstructions = function(from, to){
  return new Promise(function(resolve, reject) {
    rp('https://maps.googleapis.com/maps/api/directions/json?origin=' + from + '&destination=' + to + '&key=&language=es&mode=transit|walking|driving&alternatives=false&transit_mode=bus|subway').then((result) => {
      let route = JSON.parse(result)['routes'][0]
      if(route){
        let legs = route.legs[0]
        var title = 'Llegaras en ' + legs.duration.text + ', estas a ' + legs.distance.text
        var steps = legs.steps.map((step) => {
          return clean(step.html_instructions)
        })
        resolve([title].concat(steps))
      }
      else {
        reject('No hay ruta para el déstino')
      }
    }).catch(reject)
  })
}
