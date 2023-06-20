let i = 0
function breadcrumbs(nomeMenu,link) {
   alert('1')
        let arrCaminhos = []
        arrCaminhos.push(nomeMenu)
    
        let breadcrumbsLi = document.querySelector('.breadcrumb')
        console.log(breadcrumbsLi)
        arrCaminhos.forEach( element =>{
            console.log(element)
            
            i = i + 1
            let linha = criandoBread(element,link)
            console.log(linha)
            breadcrumbsLi.appendChild(linha)
        })
    

}

function criandoBread(params,link) {
    let linkLi = document.createElement('li')
    let linkA = document.createElement('a')
    alert(1)
    
    linkA.innerText = params
    linkA.href = link
    linkLi.className = "breadcrumb-item"
    linkA.id = "breadcrumb_"+i

    linkLi.appendChild(linkA)

    return linkLi
    // <li class="breadcrumb-item"><a id="breadcrumb_a" href="../../../../Nux/public/principal.html">Home</a></li>   
}