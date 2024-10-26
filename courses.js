const course_url = "https://csulb.instructure.com/api/v1/courses";
async function Test(){
    var request = new XMLHttpRequest()
    request.open('GET', 'https://ghibli.rest/films', true)
    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
    
      if (request.status >= 200 && request.status < 400) {
        data.forEach((movie) => {
          console.log(movie.title)
        })
      } else {
        console.log('error')
      }
    }
    request.send()
}