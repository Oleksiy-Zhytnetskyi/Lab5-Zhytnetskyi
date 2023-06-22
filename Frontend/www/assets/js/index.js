/* Classes */
class ItemBuilder {
    constructor(name, size, weight, price, iconName) {
        this.name = name;
        this.size = size;
        this.weight = weight;
        this.price = price;
        this.iconName = iconName;
    }

    getItem() {
        const item = document.createElement("section");
        item.className = "item";

        item.appendChild(this.getDataWrapper());
        item.appendChild(this.getImage());

        return item;
    }

    getImage() {
        const image = document.createElement("img");
        image.src = "assets/images/" + this.iconName;
        image.alt = this.name + " pizza";
        return image;
    }

    getDataWrapper() {
        const dataWrapper = document.createElement("section");
        dataWrapper.className = "data-wrapper";

        dataWrapper.appendChild(this.getLabel());
        dataWrapper.appendChild(this.getSpecs());
        dataWrapper.appendChild(this.getPricing());

        return dataWrapper;
    }

    getPricing() {
        const pricing = document.createElement("section");
        pricing.className = "pricing";

        pricing.setAttribute("data-single-price", this.price);
        pricing.appendChild(this.getSpan(this.price + " грн", "total-cost"));
        pricing.appendChild(this.getButton("DECREMENT"));
        pricing.appendChild(this.getSpan("1", "item-counter"));
        pricing.appendChild(this.getButton("INCREMENT"));
        pricing.appendChild(this.getButton("DELETE"));

        return pricing;
    }

    getButton(type) {
        const button = document.createElement("button");
        button.className = "circular-btn";

        const sidePanelItemsWrapper = document.querySelector(".side-box-item-wrapper");
        if (type === "DECREMENT") {
            button.className += " red-btn";
            button.innerHTML = "–";
            button.addEventListener("click", function() {
                --button.parentElement.querySelector(".item-counter").innerHTML;
                button.parentElement.querySelector(".total-cost").innerHTML = 
                    Number(button.parentElement.querySelector(".total-cost").innerHTML.replace(" грн", "")) -
                    Number(button.parentElement.getAttribute("data-single-price")) + " грн";
                if (button.parentElement.querySelector(".item-counter").innerHTML === "0") {
                    button.parentElement.parentElement.parentElement.remove();
                }
                updateSidePanelData();
                updateSavedData(sidePanelItemsWrapper.innerHTML);
            });
        }
        else if (type === "INCREMENT") {
            button.className += " green-btn";
            button.innerHTML = "+";
            button.addEventListener("click", function() {
                ++button.parentElement.querySelector(".item-counter").innerHTML;
                button.parentElement.querySelector(".total-cost").innerHTML = 
                    Number(button.parentElement.querySelector(".total-cost").innerHTML.replace(" грн", "")) + 
                    Number(button.parentElement.getAttribute("data-single-price")) + " грн";
                updateSidePanelData();
                updateSavedData(sidePanelItemsWrapper.innerHTML);
            });
        }
        else {
            button.className += " white-btn";
            button.innerHTML = "×";
            button.addEventListener("click", function() {
                button.parentElement.parentElement.parentElement.remove();
                updateSidePanelData();
                updateSavedData(sidePanelItemsWrapper.innerHTML);
            });
        }
        
        return button;
    }

    getSpecs() {
        const specs = document.createElement("section");
        specs.className = "specs-wrapper";

        specs.appendChild(this.getSize());
        specs.appendChild(this.getWeight());

        return specs;
    }

    getWeight() {
        const weightData = document.createElement("section");
        weightData.className = "item-spec";

        weightData.appendChild(this.getIcon("WEIGHT"));
        weightData.appendChild(this.getSpan(this.weight));

        return weightData;
    }

    getSize() {
        const sizeData = document.createElement("section");
        sizeData.className = "item-spec";

        sizeData.appendChild(this.getIcon("SIZE"));
        sizeData.appendChild(this.getSpan(this.size));

        return sizeData;
    }

    getIcon(isSize) {
        const icon = document.createElement("img");
        if (isSize === "SIZE") {
            icon.src = "assets/images/size-icon.svg";
            icon.alt = "pizza diameter";
        }
        else {
            icon.src = "assets/images/weight.svg";
            icon.alt = "pizza weight";
        }
        return icon;
    }

    getSpan(value, classValue = "") {
        const span = document.createElement("span");
        span.className = classValue;
        span.innerHTML = value;
        return span;
    }

    getLabel() {
        const label = document.createElement("section");
        label.className = "label";
        label.innerHTML = this.name;
        return label;
    }
}

/* Global Contants */
const FILTERS = new Object({
    "Усі": [],
    "М'ясні": [4, 6, 7],
    "З ананасами": [1, 3, 4, 6, 7],
    "З грибами": [0, 2, 4, 6, 7],
    "З морепродуктами": [0, 1, 2, 3, 4, 5],
    "Вега": [0, 1, 2, 3, 5, 6, 7]
});

/* Event Listeners */
const purchaseButtons = document.querySelectorAll(".buy-item-btn");

// Імпреза
purchaseButtons[0].addEventListener("click", () => { addItem("Імпреза (Мала)", 30, 370, 99, "pizza_7_side.png"); });
purchaseButtons[1].addEventListener("click", () => { addItem("Імпреза (Велика)", 40, 660, 169, "pizza_7_side.png"); });

// BBQ
purchaseButtons[2].addEventListener("click", () => { addItem("BBQ (Мала)", 30, 460, 139, "pizza_2_side.png"); });
purchaseButtons[3].addEventListener("click", () => { addItem("BBQ (Велика)", 40, 840, 199, "pizza_2_side.png"); });

// Міксовий поло
purchaseButtons[4].addEventListener("click", () => { addItem("Міксовий поло (Мала)", 30, 430, 115, "pizza_1_side.png"); });
purchaseButtons[5].addEventListener("click", () => { addItem("Міксовий поло (Велика)", 40, 780, 179, "pizza_1_side.png"); });

// Сициліано
purchaseButtons[6].addEventListener("click", () => { addItem("Сициліано (Мала)", 30, 450, 111, "pizza_5_side.png"); });
purchaseButtons[7].addEventListener("click", () => { addItem("Сициліано (Велика)", 40, 790, 169, "pizza_5_side.png"); });

// Маргарита
purchaseButtons[8].addEventListener("click", () => { addItem("Маргарита", 30, 370, 89, "pizza_3_side.png"); });

// Мікс смаків
purchaseButtons[9].addEventListener("click", () => { addItem("Мікс смаків (Мала)", 30, 470, 115, "pizza_6_side.png"); });
purchaseButtons[10].addEventListener("click", () => { addItem("Мікс смаків (Велика)", 40, 780, 180, "pizza_6_side.png"); });

// Дольче Маре
purchaseButtons[11].addEventListener("click", () => { addItem("Дольче Маре", 40, 845, 399, "pizza_8_side.png"); });

// Россо Густо
purchaseButtons[12].addEventListener("click", () => { addItem("Россо Густо (Мала)", 30, 400, 189, "pizza_4_side.png"); });
purchaseButtons[13].addEventListener("click", () => { addItem("Россо Густо (Велика)", 40, 700, 299, "pizza_4_side.png"); });

/* Functions */
function addItem(name, size, weight, price, iconName) {
    const items = document.querySelector(".side-box-item-wrapper").children;
    for (const item of items) {
        if (item.querySelector(".label").innerHTML === name) {
            ++item.querySelector(".item-counter").innerHTML;
            item.querySelector(".total-cost").innerHTML = 
                Number(item.querySelector(".total-cost").innerHTML.replace(" грн", "")) + 
                Number(item.querySelector(".pricing").getAttribute("data-single-price")) + " грн";
            updateSidePanelData();
            updateSavedData(document.querySelector(".side-box-item-wrapper").innerHTML);
            return;
        }
    }

    const builder = new ItemBuilder(name, size, weight, price, iconName);
    document.querySelector(".side-box-item-wrapper").appendChild(builder.getItem());
    handleSidePanelOverflow();
    updateSidePanelData();
    updateSavedData(document.querySelector(".side-box-item-wrapper").innerHTML);
}

function loadData() {
    const sidePanelItemsWrapper = document.querySelector(".side-box-item-wrapper");
    sidePanelItemsWrapper.innerHTML = getSavedData();
    initItemCartClearButton();
    initFilters();
    reinitialiseButtonListeners();
    handleSidePanelOverflow();
    updateSidePanelData();
}

function initFilters() {
    const allFilters = document.querySelector(".filter-wrapper").children;
    for (const filter of allFilters) {
        filter.addEventListener("click", function() {
            if (filter.className !== "active") {
                const oldFilter = document.querySelector(".active");
                oldFilter.className = "";
                oldFilter.style.backgroundColor = "inherit";
                oldFilter.style.color = "darkorange";

                filter.className = "active";
                filter.style.backgroundColor = "rgb(253, 171, 18)";
                filter.style.color = "whitesmoke";
                filter.style.borderRadius = "4px";

                applyFilter(filter.innerHTML);
            }
        });
    }
}

function applyFilter(filterName) {
    const allItems = document.querySelector(".grid-container").children;
    const excludedItems = FILTERS[filterName];

    document.querySelector(".filter-label-wrapper > .second").innerHTML = allItems.length - excludedItems.length;
    for (let i = 0; i < allItems.length; i++) {
        if (excludedItems.indexOf(i) !== -1) allItems[i].style.display = "none";
        else allItems[i].style.display = "block";
    }
}

function initItemCartClearButton() {
    const sidePanelItemsWrapper = document.querySelector(".side-box-item-wrapper");
    const clearButton = sidePanelItemsWrapper.parentElement.querySelector(".clear-cart-items");
    clearButton.addEventListener("click", function() {
        sidePanelItemsWrapper.innerHTML = "";
        updateSidePanelData();
        updateSavedData(sidePanelItemsWrapper.innerHTML);
    });
}

function reinitialiseButtonListeners() {
    const sidePanelItemsWrapper = document.querySelector(".side-box-item-wrapper");
    for (const item of sidePanelItemsWrapper.children) {
        item.querySelector(".red-btn").addEventListener("click", function() {
            const button = item.querySelector(".red-btn");
            --button.parentElement.querySelector(".item-counter").innerHTML;
            button.parentElement.querySelector(".total-cost").innerHTML = 
                Number(button.parentElement.querySelector(".total-cost").innerHTML.replace(" грн", "")) -
                Number(button.parentElement.getAttribute("data-single-price")) + " грн";
            if (button.parentElement.querySelector(".item-counter").innerHTML === "0") {
                button.parentElement.parentElement.parentElement.remove();
            }
            updateSidePanelData();
            updateSavedData(sidePanelItemsWrapper.innerHTML);
        });

        item.querySelector(".green-btn").addEventListener("click", function() {
            const button = item.querySelector(".green-btn");
            ++button.parentElement.querySelector(".item-counter").innerHTML;
            button.parentElement.querySelector(".total-cost").innerHTML = 
            Number(button.parentElement.querySelector(".total-cost").innerHTML.replace(" грн", "")) + 
            Number(button.parentElement.getAttribute("data-single-price")) + " грн";
            updateSidePanelData();
            updateSavedData(sidePanelItemsWrapper.innerHTML);
        });

        item.querySelector(".white-btn").addEventListener("click", function() {
            const button = item.querySelector(".white-btn");
            button.parentElement.parentElement.parentElement.remove();
            updateSidePanelData();
            updateSavedData(sidePanelItemsWrapper.innerHTML);
        });
    }
}

function getSavedData() {
    return window.localStorage.getItem("saved-data");
}

function updateSavedData(newData) {
    window.localStorage.setItem("saved-data", newData);
}

function updateSidePanelData() {
    let itemsTotal = 0, priceTotal = 0; 

    const sidePanelItemsWrapper = document.querySelector(".side-box-item-wrapper");
    for (const item of sidePanelItemsWrapper.children) {
        ++itemsTotal;
        priceTotal += Number(item.querySelector(".total-cost").innerHTML.replace(" грн", ""));
    }

    document.querySelector(".item-count-wrapper > .second").innerHTML = itemsTotal;
    document.querySelector(".total-price-wrapper > .second").innerHTML = priceTotal + " грн";
}

function handleSidePanelOverflow() {
    const sidePanelItemsWrapper = document.querySelector(".side-box-item-wrapper");
    if (sidePanelItemsWrapper.children.length >= 5) {
        sidePanelItemsWrapper.style.overflowY = "scroll";
        sidePanelItemsWrapper.style.overflowX = "hidden";
    } 
}

/* Function Calls */
loadData();
