// ===== DOM =====

const worksGallery = document.getElementById("works-gallery");
const worksDetails = document.getElementById("works-details");
const worksList = document.getElementById("works-list");

const exhibitionsGallery = document.getElementById("exhibitions-gallery");
const exhibitionsDetails = document.getElementById("exhibitions-details");
const exhibitionsList = document.getElementById("exhibitions-list");


// ===== STATE =====

let selectedWork = "all";
let selectedExhibition = "all";


// ===== HELPERS =====

function getWork(id) {
    return works.find(work => work.id === id);
}

function getExhibition(id) {
    return exhibitions.find(exhibition => exhibition.id === id);
}


// ===== WORKS INDEX =====

function renderWorksIndex() {

    worksList.innerHTML = "";

    const all = document.createElement("div");
    all.textContent = "All";

    if (selectedWork === "all") {
        all.classList.add("selected");
    }

    all.onclick = () => {
        selectedWork = "all";
        renderWorksIndex();

        worksGallery.innerHTML = "";
        worksDetails.innerHTML = "";
    };

    worksList.appendChild(all);

    works.forEach(work => {

        const item = document.createElement("div");

        item.textContent = work.title;

        if (selectedWork === work.id) {
            item.classList.add("selected");
        }

        item.onclick = () => {

            selectedWork = work.id;

            renderWorksIndex();

            renderWork(work);

        };

        worksList.appendChild(item);

    });

}


// ===== EXHIBITIONS INDEX =====

function renderExhibitionsIndex() {

    exhibitionsList.innerHTML = "";

    const all = document.createElement("div");
    all.textContent = "All";

    if (selectedExhibition === "all") {
        all.classList.add("selected");
    }

    all.onclick = () => {

        selectedExhibition = "all";

        renderExhibitionsIndex();

        exhibitionsGallery.innerHTML = "";
        exhibitionsDetails.innerHTML = "";

    };

    exhibitionsList.appendChild(all);

    exhibitions.forEach(exhibition => {

        const item = document.createElement("div");

        item.textContent = exhibition.title;

        if (selectedExhibition === exhibition.id) {
            item.classList.add("selected");
        }

        item.onclick = () => {

            selectedExhibition = exhibition.id;

            renderExhibitionsIndex();

            renderExhibition(exhibition);

        };

        exhibitionsList.appendChild(item);

    });

}


// ===== WORK =====

function renderWork(work) {

    renderGallery(work);

    renderDetails(work);

}


function renderGallery(work) {

    worksGallery.innerHTML = "";

    if (work.type === "image") {

        const img = document.createElement("img");

        img.src = work.cover;

        worksGallery.appendChild(img);

    }

}


function renderDetails(work) {

    worksDetails.innerHTML = `
        <h3>${work.title}</h3>

        <p>${work.year}</p>

        <p>${work.medium || ""}</p>

        <p>${work.description || ""}</p>

        <div class="relations">

            <div>Shown in</div>

            ${work.exhibitions
                .map(id => {

                    const exhibition = getExhibition(id);

                    if (!exhibition) return "";

                    return `
                        <div class="relation"
                             data-exhibition="${exhibition.id}">
                            ${exhibition.title}
                        </div>
                    `;

                })
                .join("")}

        </div>
    `;

}


// ===== EXHIBITION =====

function renderExhibition(exhibition) {

    exhibitionsGallery.innerHTML = "";

    exhibitionsDetails.innerHTML = "";

    exhibition.images.forEach(path => {

        const img = document.createElement("img");

        img.src = path;

        exhibitionsGallery.appendChild(img);

    });

    exhibitionsDetails.innerHTML = `
        <h3>${exhibition.title}</h3>

        <p>${exhibition.year}</p>

        <p>${exhibition.venue}</p>

        <p>${exhibition.city}</p>

        <p>${exhibition.description}</p>
    `;

}


// ===== START =====

renderWorksIndex();
renderExhibitionsIndex();