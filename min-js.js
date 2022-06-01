//declare tomt array
let sections = [];

//generer tom pris, til beregning af total kuvertpris
let totalPrice = 0;

function loadSections() {
    //Henter alle menu-punkter, og putter ind i et array.
    sections = document.querySelectorAll(".put-menu-item");
}

//click-events tilføjes på "Tilføj menu"-knapper
function addButtonClickEvents() {

	//for-loop køres: betyder at den løber alle menupunkter igennem 
    for(let i = 0; i < sections.length; i++) {

		//når en af menupunkternes knappes klikkes på, popper menuen frem
        const section = sections[i];
        let button = section.querySelectorAll(".elementor-button")[0];

        //Sætter <a>-tag'gets data-id attribute, til at være det samme som den section den tilhører.
        button.setAttribute("data-id", section.getAttribute("data-id"));
        
		//Det samme sker for alle <span>-tags der dækker over teksten i <a>-tagget. Span-tags er fx menu-navne
        let spans = button.getElementsByTagName("span");
        for (let i = 0; i < spans.length; i++) {
            const element = spans[i];
            element.setAttribute("data-id", section.getAttribute("data-id"));
        }

        //Herefter får "Tilføj"-knapperne en EventListener, som kalder på en metode når knappen trykkes på.
        button.addEventListener("click", buttonClickEvent);
        
    }

}

function buttonClickEvent(event) {

    //Henter det Id, som et menu punkt har.
    let menuItemDataId = event.target.getAttribute("data-id");
	
    //Herefter bliver menu punktet hentet, ud fra det Id der blev sendt med over.
    let section = document.querySelectorAll(`section[data-id="${menuItemDataId}"]`)[0];

    //Her oprettes et JS-Object, som holder værdierne for menuen, hhv navn og pris.
    let menuItem = {
        price: section.querySelector(".heading-menu-price").querySelector("h2").textContent,
        name: section.querySelector(".heading-menu-name").querySelector("h2").textContent
    }

    //Template bliver hentet fra HTML'en.
    let template = document.getElementById("put-on-menu").getElementsByTagName("template")[0];
    
    //En Div bliver oprettet til at putte det nye menu punkt ind i.
    let div = document.createElement("div");
	
    //Den nye div får et id, som reflektere menuens id. Der bruges jQuery, til at vælge alle elementer fra menuItemDataId - bruges til at manipulere DOM'en
    div.id = `cart-menu-item-${menuItemDataId}`;
	
    //Den nye div bliver udfyldt med templaten.
    div.innerHTML = template.innerHTML;

    //Her sættes prisen for menuen.
    div.getElementsByClassName("pris")[0].textContent = menuItem.price;
	
    //Her sættes navn for menuen.
    div.getElementsByClassName("titel")[0].textContent = menuItem.name;

    //Her får knappen der skal fjerne menuen fra kurven et id.
    div.getElementsByClassName("remove-btn")[0].id = menuItemDataId;
	
    //Her får den samme knap, en ny EventListener, som skal kører en funktion når den trykkes på.
    div.getElementsByClassName("remove-btn")[0].addEventListener("click", removeFromCart);

    //Her bliver menuen tilføjet til kurven.
    document.getElementById("hans-menu").appendChild(div);

    //Sørger for at kurven bliver vist.
    document.getElementById("hans-menu").classList.remove("elementor-hidden-desktop");
    document.getElementById("hans-menu").classList.remove("elementor-hidden-tablet");

    //Opdatere det subtotale i menuen.
    updateSubtotal();

}

//Metode der henter menupunktets id, og fjerner menupunktet fra kurven
function removeFromCart(event) {

    let element = document.getElementById(`cart-menu-item-${event.target.id}`);
    element.remove();

    updateSubtotal();

}

function updateSubtotal() {

    //Henter alle menuer i kurven.
    let elements = document.getElementsByClassName("hans-menu-item-price");

    totalPrice = 0;

    //Her bliver menuer'ne priser regnet sammen, og tilføjet.
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        totalPrice += parseInt(element.textContent);
    }

    //Den nye subtotale pris indsættes i HTML'en.
    let priceContainer = document.getElementById("hans-menu-total-price").getElementsByTagName("h6")[0];
   
	//jQuery bruges til at udskrive prisen
	priceContainer.textContent = `${totalPrice} DKK`;

}

loadSections();
addButtonClickEvents();

console.log("Menukort + sammensætter virker")