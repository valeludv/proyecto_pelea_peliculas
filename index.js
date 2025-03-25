const fetchData = async(searchTerm) => {
    const response = await axios.get('http://omdbapi.com/', {
        params: {
            apikey: '4e8018d1',
            s: 'avengers'
        }
    })

if(response.data.Error){
    return []
}
console.log(response.data.Search)

}

//fetchData()
const root = document.querySelector(' .autocomplete')
root.innerHTML = `
    <label><b>Busqueda de Peliculas</b></label>
    <input class="input" />
    <div class="dropdow">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`

const input = document.querySelector("Input")
const dropdonw = document.querySelector(' .dropdown')
const resultsWrapper = document.querySelector(' .results')
    
const debonce = (func, delay = 1000) =>{
    let timeoutId
    return(...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}
const onInput = async(event) =>{
    const movies = await fetchData(event.target.value)
    console.log("MOVIES: ", movies)

    if(!movies.length){
        dropdonw.classList.remove('is-active')
    }

    resultsWrapper.innerHTML = ''
    dropdonw.classList.add('is-active')

    for(let movie of movies){
        const option = document.createElement('a')
        const imgSrc = movie.Poster === 'N/A'?'': movie.Poster

        option.classList.add('dropdown-item')
        option.innerHTML = `
        <img src ="${imgSrc}" />
        ${movie.Title}
        `
        option.addEventListener('click', () => {
            dropdonw.classList.remove('is-active')
            input.value = movie.Title
            onMovieSelect(movie)
        })
        resultsWrapper.appendChild(option)
    }
}

input.addEventListener('input', debunce(onInput, 1000))

document.addEventListener('click', event => {
    if(!root.contains(event.target)) {
        dropdonw.classList.remove('is-active')
    }
})

const onMovieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '',
        i: movie.imdID
        }
    })

    console.log(response.data)
    document.querySelector('#sumary').innerHTML = movieTemplate(response)
}

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class"media-left">
                <p class="image">
                    <img src="${movieDetail.POster}" />
                </p>
            </figure>
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </article> 
    `

}