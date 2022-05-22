var sections = [];

function loadSections() {
    sections = document.getElementsByClassName("put-menu-item");
}

function addButtonClickEvents() {

    for(var i = 0; i < sections.length; i++) {

        const section = sections[i];
        var button = section.getElementsByClassName("elementor-button")[0];

        //Sætter <a>-tag'gets data-id attribute, til at være det samme som den section den tilhører.
        button.setAttribute("data-id", section.getAttribute("data-id"));
        //Det samme sker for alle <span>-tags der dækker over teksten i <a>-tagget.
        var spans = button.getElementsByTagName("span");
        for (let i = 0; i < spans.length; i++) {
            const element = spans[i];
            element.setAttribute("data-id", section.getAttribute("data-id"));
        }

        button.addEventListener("click", buttonClickEvent);
        
    }

}

function buttonClickEvent(event) {

    var menuItemDataId = event.target.getAttribute("data-id");
    var section = document.querySelectorAll(`section[data-id="${menuItemDataId}"]`)[0];

    var menuItem = {
        price: section.querySelector(".heading-menu-price").querySelector("h2").textContent,
        name: section.querySelector(".heading-menu-name").querySelector("h2").textContent
    }

    var template = document.getElementById("put-on-menu").getElementsByTagName("template")[0];
    
    var div = document.createElement("div");
    div.id = `cart-menu-item-${menuItemDataId}`;

    div.innerHTML = template.innerHTML;

    div.getElementsByClassName("pris")[0].textContent = menuItem.price;
    div.getElementsByClassName("titel")[0].textContent = menuItem.name;
    
    div.getElementsByClassName("remove-btn")[0].id = menuItemDataId;
    div.getElementsByClassName("remove-btn")[0].addEventListener("click", removeFromCart);

    document.getElementById("hans-menu").appendChild(div);

}

function removeFromCart(event) {

    var element = document.getElementById(`cart-menu-item-${event.target.id}`);
    element.remove();

}

loadSections();
addButtonClickEvents();

console.log("Added events to menu buttons.")