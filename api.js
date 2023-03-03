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
        <img src="${result.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Features</h5>
          <p class="card-text"></p>
          
        </div>
        <div class="card-footer">
        <h3 class="card-title">${result.name}</h3>
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
        `
        infoContainer.appendChild(cardDiv);

        console.log(result);
    }
    

} 

loadData();
console.log("Connected");