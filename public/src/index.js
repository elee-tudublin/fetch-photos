
// JavaScript Fetch, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// NASA
// https://api.nasa.gov/
//
const url_nasa = 'https://api.nasa.gov/planetary/apod?api_key=IpcMgXbpAzoXXkxdmzj8wUQtpQOzj8ye2FPN2vys';

// Animals
// https://github.com/public-apis/public-apis#animals
//
const url_cat = 'https://aws.random.cat/meow';
const url_dog = 'https://random.dog/woof.json';
const url_duck = 'https://random-d.uk/api/v2/random';

// HTTP request settings
const headers = new Headers();
const reqInit = { method: 'GET', headers: headers, mode: 'cors', cache: 'default' };



// Asynchronous Function to call API and get data
// note parameter value default (in case it is missing)
async function getData(url) {

  try {

    // call the api - await indicates an async call
    // this call is non blocking and will return a promise
    const response = await fetch(url, reqInit);
    
    // get json data from the response - when it arrives
    const json =await response.json();
    
    // log raw json result
    console.log(json);
    
    // return json
    return json;

    // catch any errors
  } catch (err) {
    console.log(err);
  }
}

// Function accepts an array of news articles
// Articles are parsed and displayed
async function displayApod() {

  const data = await getData(url_nasa);

  const apodHTML = `
  <img class="image" src=${data.hdurl} alt='NASA Astronomy Pic of the Day ${data.title}'>
  <h4>${data.title}</h4>
  <p>Image credit & copyright: ${data.copyright} ${data.date}</p>
  `;
  
  // Set the innerHTML of the apod  element = html
  let articlesElement = document.getElementById('apod')
  articlesElement.innerHTML = apodHTML;

} // end function

async function getRandomAnimal() {

  let data;
  let pic = '';
  switch (this.id) {
    case "cat":
      data = await getData(url_cat);
      pic = data.file;
      break;
    case "dog":
      data = await getData(url_dog);
      pic = data.url;
      break;
    default:
      pic = 'no_data.jpg';
      console.log('invalid animal');
  }
  document.getElementById("animalPic").src = pic;



} // End function

document.getElementById("cat").addEventListener("click", getRandomAnimal);
document.getElementById("dog").addEventListener("click", getRandomAnimal);

// Call the function immediatly after script is loaded
displayApod()

// Will this message display before or after the JSON data and why?
console.log('Has getNewsData() finished yet?');
