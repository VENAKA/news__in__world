let int = document.querySelector('.int')
let btn = document.querySelector('.btn')
let cont = document.querySelector('.cont')
let firstPage = document.querySelector('.page')

let page = 1
let nothing = ''
let apiUrl = 'https://newsapi.org/v2/everything'
let apiKey = 'eecb98b13f71444a8bab6b9a7ccb1274'

let right = document.querySelector('.right')
let left = document.querySelector('.left')

let totalPages = 1


function checkAPI(){

    let url = `${apiUrl}?q=${intvalue}&page=${page}&apiKey=${apiKey}`
    fetch(url)
    .then(response =>{

        if(!response.ok){
            console.error(error)
        }
        return response.json()
    })
    .then(value =>{
        console.log(value)
        totalPages = Math.ceil(value.totalResults/10)
        value.articles.forEach(element => {
            if(value.articles.lenght === 0){
                cont.innerHTML = '<li> news not-find </li>'
            }
            let articles = document.createElement('li')
            articles.className = 'art'
            articles.innerHTML = `
                            <a href="${element.url}" target="_blank" rel="noopener noreferrer" class="link-a">
                                <article>
                                    <img src="${element.urlToImage || 'https://via.placeholder.com/480'}" alt="${element.title}" class="img">
                                    <h2 class="title__2">${element.title}</h2>
                                    <p class="post">Posted by: ${element.author || 'Unknown'}</p>
                                    <p class="text">${element.description || 'No description available'}</p>
                                </article>
                            </a>
                        `;
            cont.appendChild(articles)
        });
        pagination()
    })


    .catch(error =>{
        console.error(error)
    })
}

function pagination(){
    firstPage.textContent = `page ${page}`
    if(page === 1){
        left.style.display = 'none'
    }
    else{
        left.style.dispay = 'block'
    }
    if(page >= totalPages){
        right.style.dispay = 'none'
    }
    else{
        right.style.display = 'block'
    }
}

btn.addEventListener('click', function(){
    intvalue = int.value 
    if(intvalue !== nothing && intvalue){
        nothing = intvalue
        page = 1
        checkAPI()
    }


})

right.addEventListener('click', function(){
    if(page <= totalPages){
        page ++ 
        checkAPI()
    }
})
left.addEventListener('click' , function(){
    if(page > 1){
        page --
        checkAPI()
    }
})



// // // // // // //
