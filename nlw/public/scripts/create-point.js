// Popular Estado e Cidade com infos do IBGE

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch( "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json() ) //Função anônima que está retornando um valor
    .then( states => {
        // Para cada estado de estados
        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) //Função anônima que está retornando um valor
    .then( cities => {
        

        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta

// Pegar todos os itens de coleta cadastrados
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){

    const itemLi = event.target

    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id


    // Verificar se existem itens selecionados, se sim

    // Pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        return item == itemId
    })

    // Se já estiver selecionado, tirar da seleção

    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            return item != itemId
        })

        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }


    // Atualizar o campo escondido com os itens selecionados
    // document.querySelector("input[name=items]")

    collectedItens.value = selectedItems

}

