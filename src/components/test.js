const getData = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/ditto"
    const response = await fetch(url)
    const data = await response.json()
    console.log(Object.keys(data))
}

getData()