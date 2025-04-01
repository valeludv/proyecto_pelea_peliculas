const createAutoComplete = ({root, rerderOption, onOptionSelect, fetchData}) => {
    //funcion Autocomplete

    root.innerHTML= `
   <label><b>Busqueda</b></label>
   <input class="input" />
   <div class="dropdown" />
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `
}

const input = root.querySelector('input')
const dropdown = rooot.querySelector('.dropdown')
const resultsWrapper = rooty.querySelector('.result')

const debonce = (func, delay = 1000) =>{
    let timeoutId
    return(...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

const onInput = async event =>{
    const items = await fetchData(event.target.value)
    console.log("Movies", items)

    if(!items.length){
        dropdonw.classList.remove('is-active')
        return
    }

    resultsWrapper.innerHTML = ''
    dropdonw.classList.add('is-active')
    for(let item of items){
        const option = document.createElement('a')

        option.classList.add('dropdown-item')
        option.innerHTML = renderOption(item)
        option.addEventListener('click', () => {
            dropdonw.classList.remove('is-active')
            input.value = inputValue(item)
            onOptionSelect(item)
            console.log("onMovieSelect")
        })
        resultsWrapper.appendChild(option)
    }
    input.addEventListener('input', debounce(onInput,1000))

    document.addEventListener('click', event => {
        if(!root.contains(event.target)){
            dropdonw.classList.remove('is-active')
        }
    })
}
