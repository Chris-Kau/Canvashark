const course_url = "https://csulb.instructure.com/api/v1/courses";

async function Test(){
    const response = await fetch('https://ghibli.rest/films');
    const data = await response.json();
    var bleh = JSON.parse(this.response)
    bleh.foreach((movie)=>{
        console.log(movie)
    });
}
// fetch(course_url)

//     .then(response =>{
//         if (!response.ok){
//             throw new Error("Network response was not ok");
//         }
//         else{
//             return response.json();
//         }
//     })
//     .then(data=>{
//         console.log(JSON.stringify(data, null, 2));
//     })
//     .catch(error =>{
//         console.error('Error: ', error)
//     })