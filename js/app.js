let house = document.getElementById("house")
let senate = document.getElementById("senate")

const app = Vue.createApp({
data (){
    return{
    esVisible:true,
    members:[],
    democracts:[],
    republicans:[],
    independents:[],
    parties:[],
    estados:[],
    seleccionado:""
    };
},

created(){
    const init = {
        method:'GET',
        headers: {
            "X-API-Key":"An0585fw7UMASqHrsdtteZUetX8qDffabLpbLdpu",
        }
    }
    
    if (house)
    var endpoint = "https://api.propublica.org/congress/v1/113/house/members.json"
    else if (senate)
    var endpoint = "https://api.propublica.org/congress/v1/113/senate/members.json"
    
    fetch(endpoint,init)
    .then(res => res.json())
    .then(data => {
         this.members = data.results[0].members
         this.democracts = [...data.results[0].members.filter(e=>e.party=="D")]
         this.republicans = [...data.results[0].members.filter(e=>e.party=="R")]
         this.independents = [...data.results[0].members.filter(e=>e.party=="ID")]
    }
    )},
    
methods:{
    toggleVisible(){
        this.esVisible = !this.esVisible
    }
},
computed:{
partiesFiltrados(){
    let arrayParty= this.members.filter(e => this.parties.includes(e.party) || this.parties.length === 0)// //Arreglo filtrado por Partidos
    if (this.seleccionado=="")   //Si no hay ningun valor en el Select ....
        return arrayParty
    else{
        let arrayPartySelected = arrayParty.filter(e=>e.state == this.seleccionado) //Arreglo filtrado por partido y estado.
        return arrayPartySelected
    }
    
    },
estadosFiltrados(){
       let EstadosRepetidos=[]
       this.members.map(e => EstadosRepetidos.push(e.state)) 

       let Estados=[]
       EstadosRepetidos.sort()
       for (let i=0 ; i < EstadosRepetidos.length; i++)
       {
       if(EstadosRepetidos[i] != EstadosRepetidos[i+1])
       Estados.push(EstadosRepetidos[i])
       }
        return this.states = Estados
},
funcPCTAverageD(){    //Calcula vote with party de Democratas
    let acum=0;
    for(let i=0; i<this.democracts.length ; i++)
        {
       acum=acum + this.democracts[i].votes_with_party_pct ; 
        }
    if(this.democracts.length>0){
        acum=(acum/this.democracts.length).toFixed(2)
        return acum}
        else
        return acum
     },

funcPCTAverageR(){   //Calcula vote with party de Republicans
    let acum=0;
    for(let i=0; i<this.republicans.length ; i++)
        {
       acum=acum + this.republicans[i].votes_with_party_pct ; 
        }
    if(this.republicans.length>0){
        acum=(acum/this.republicans.length).toFixed(2)
        return acum}
        else
        return acum
     },
     funcPCTAverageID(){ //Calcula vote with party de Independents
        let acum=0;
        for(let i=0; i<this.independents.length ; i++)
            {
           acum=acum + this.independents[i].votes_with_party_pct ; 
            }
        if(this.independents.length>0){
            acum=(acum/this.independents.length).toFixed(2)
            return acum}
            else
            return acum
         },
    obtenerDiezPorcientoLeastengaged(){     //Obtiene 10% de Attendance tabla Least Engaged
       
            let arrayAux = [...this.members]                  // Creo una copia del arrayOriginal
            arrayAux.sort( (a,b) => {
            if ( a.missed_votes_pct < b.missed_votes_pct) {
                if(false){
                    return -1
                }else {
                    return 1
                }
            }
            if ( a.missed_votes_pct > b.missed_votes_pct) {
                if(false){
                    return 1
                }else {
                    return -1
                }
            }
            return 0
        }) 
        let posicionDiezPorciento = parseInt(this.members.length * .1)  //Segun el array , tomo el 10% del tamaño.
        let arrayAuxFiltrado = arrayAux.filter(function (e) { return e.missed_votes_pct !=0})
        arrayAuxFiltrado = arrayAuxFiltrado.splice(0,posicionDiezPorciento +1)
        return arrayAuxFiltrado

        },
        obtenerDiezPorcientoMosttengaged(){    //Obtiene 10% de Attendance tabla Most Engaged
       
            let arrayAux = [...this.members]                  // Creo una copia del arrayOriginal
            arrayAux.sort( (a,b) => {
            if ( a.missed_votes_pct < b.missed_votes_pct) {
                if(true){
                    return -1
                }else {
                    return 1
                }
            }
            if ( a.missed_votes_pct > b.missed_votes_pct) {
                if(true){
                    return 1
                }else {
                    return -1
                }
            }
            return 0
        }) 
        let posicionDiezPorciento = parseInt(this.members.length * .1)  //Segun el array , tomo el 10% del tamaño.
        let arrayAuxFiltrado = arrayAux.filter(function (e) { return e.missed_votes_pct !=0})  //Me devuelve un array, sin valores en 0
        arrayAuxFiltrado = arrayAuxFiltrado.splice(0,posicionDiezPorciento +1) // guardo el 10% del array
        return arrayAuxFiltrado
        },
        obtenerDiezPorcientoLeastLoyal(){
       
            let arrayAux = [...this.members]                  // Creo una copia del arrayOriginal
            arrayAux.sort( (a,b) => {
            if ( a.votes_with_party_pct < b.votes_with_party_pct) {
                if(true){
                    return -1
                }else {
                    return 1
                }
            }
            if ( a.votes_with_party_pct > b.votes_with_party_pct) {
                if(true){
                    return 1
                }else {
                    return -1
                }
            }
            return 0
        }) 
        let posicionDiezPorciento = parseInt(this.members.length * .1)  //Segun el array , tomo el 10% del tamaño.
        let arrayAuxFiltrado = arrayAux.filter(function (e) { return e.votes_with_party_pct !=0})  //Me devuelve un array, sin valores en 0
        arrayAuxFiltrado = arrayAuxFiltrado.splice(0,posicionDiezPorciento +1) // guardo el 10% del array
        return arrayAuxFiltrado
        },  
        obtenerDiezPorcientoMostLoyal(){
            let arrayAux = [...this.members]                  // Creo una copia del arrayOriginal
            arrayAux.sort( (a,b) => {
            if ( a.votes_with_party_pct < b.votes_with_party_pct) {
                if(false){
                    return -1
                }else {
                    return 1
                }
            }
            if ( a.votes_with_party_pct > b.votes_with_party_pct) {
                if(false){
                    return 1
                }else {
                    return -1
                }
            }
            return 0
        }) 
        let posicionDiezPorciento = parseInt(this.members.length * .1)  //guardo el 10% para luego usarlo en splice 
        arrayAux = arrayAux.splice(0,posicionDiezPorciento +1) 
        return arrayAux
        },       
},
});

app.mount("#app");