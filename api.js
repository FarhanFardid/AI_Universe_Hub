// data load via api

const loadData = async () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools);
}
// display tha loaded data
const displayData= (results) =>{
    const infoContainer = document.getElementById('info_container');
    for (const result of results){
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        <div class="card h-100">
        <img src="${result.image}" class="card-img-top p-4 border rounded-3" alt="...">
        <div class="card-body">
        <h5 class="card-title">Features</h5>
          <p class="card-text">
          <ol>
          
          <li>${result.features[0]}</li>
          <li>${result.features[1]}</li>
          <li>${result.features[2] ? result.features[2]: 'ChatBox'} </li>
        </ol>
          </p>
        
        </div>
        <div class="card-footer">
        <h3 class="card-title">${result.name}</h3>
        <div class="row row-cols-2">
       <div class="col-10"><small class="text-muted " ><i class="fa-regular fa-calendar-days p-1"></i>${result.published_in}</small></div>

        <div class="col-2"><button class="btn btn-primary"><i class="fa-solid fa-arrow-right"></i></button></div>
     
        </div>

        </div>
      </div>
        `
        infoContainer.appendChild(cardDiv);

        console.log(result);
    }
    

} 

loadData();
console.log("Connected");