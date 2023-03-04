// data load via api

const loadData = async (n) =>{
    toggleLoader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, n);
}
// display tha loaded data
const displayData= (results, dataLimit) =>{
    const infoContainer = document.getElementById('info_container');
    infoContainer.innerHTML ='';
    const showbtn = document.getElementById('show_btn');

    // display 6 card result and dispaly show more button

    if(dataLimit){   
         results = results.slice(0,6);
         
    }
    // display all cards and hide the show more button
    else{
        showbtn.classList.add('d-none');
    }

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

        <div class="col-2"><button  onclick ="loadInfoDetails('${result.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button></div>

      
     
        </div>

        </div>
      </div>
        `
        infoContainer.appendChild(cardDiv);

        console.log(result);
    }

    const showAllBtn = document.getElementById('show_btn');
    showAllBtn.innerHTML=`
    <button id="show_all" onclick="loadData()" class="btn btn-danger fw-bolder text-white px-3 py-2 rounded-3">Show More </button>`

    toggleLoader(false);

} 

// loader show and hide 
const toggleLoader = isLoading => {
    const Loader = document.getElementById('loader');
    if(isLoading){
        Loader.classList.remove('d-none');
    }
    else{
        Loader.classList.add('d-none');
    }
}

const loadInfoDetails = id =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(data => displayInfo(data.data))
}

const displayInfo = info =>{
    console.log(info);
    const modalCard1 =document.getElementById('mCard-1');
    const modalCard2 = document.getElementById('mCard-2');
   
     

    modalCard1.innerHTML=`

    <div class="card-body">
      <h5 class="card-title fw-bolder">${info.description}</h5>
      <div class="d-flex justify-content-around align-items-center p-2">
      <div class="text-center fw-bold text-success p-1 fs-6">
      <p>${info.pricing? info.pricing[0].price: "Free of cost/"}  ${info.pricing? info.pricing[0].plan : "Basic"}</p>
      
      </div>
      <div class="text-center fw-bold text-warning p-1 fs-6">
      <p>${info.pricing? info.pricing[1].price: "Free of cost/"} ${info.pricing? info.pricing[1].plan : "Pro"}</p>
    
      </div>
      <div class="text-center fw-bold text-danger p-1 fs-6">
      <p>${info.pricing? info.pricing[2].price: "Free of cost/"} ${info.pricing? info.pricing[2].plan : "Enterprise"}</p>
    
      </div>
      </div>

     <div class="d-flex justify-content-between">
       <div> 
       <h5 class="fw-bolder">Features</h5>
       <p>

          <ul class="p-2">
          <li>${info.features['1'].feature_name}</li>
          <li>${info.features['2'].feature_name}</li>
          <li>${info.features['3'] ? info.features['3'].feature_name : 'ChatBox'} </li>
          </ul>
       </p>
        </div>
        <div> 
        <h5 class="fw-bolder">Integrations</h5>
        <p>
           <ul class="p-2" id="list">
           <li>${info.integrations !== null ? info.integrations[0] !== undefined ? info.integrations[0] : 'No data found' : 'No data found' }</li>
           <li>${info.integrations !== null ? info.integrations[1] !== undefined ? info.integrations[1] : 'No data found' : 'No data found' }</li>
          
         
           </ul>
        </p>
         </div>
     
     </div>
      
    `
  
   modalCard2.innerHTML = `
    <div class="text-center "> <span class="position-absolute bg-danger  mt-2 me-4 w-50 rounded-3 text-center"> ${info.accuracy.score ? info.accuracy.score * 100 + '% accuracy' : ''}</span></div>
    <img src="${info.image_link[0]}" class="card-img-top" alt="image">
    <div class="card-body">
      <h5 class="card-title text-center">${info.input_output_examples? info.input_output_examples[0].input : 'Can you give any example?'}</h5>
      <p class="card-text text-center">${info.input_output_examples? info.input_output_examples[0].output:'No!Not Yet!Working on..'}</p>
     
    `
  

}
loadData(6);
// console.log("Connected");