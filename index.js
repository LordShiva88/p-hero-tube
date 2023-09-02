const loadTabData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const tabData = data.data;

  const tabContainer = document.getElementById("tab-container");
  // Show the all tab
  tabData.forEach((element) => {
    const tabLink = document.createElement("a");
    tabLink.setAttribute("tabindex", "0");
    tabLink.innerHTML = element.category;
    tabLink.classList.add(
      "tab",
      "bg-[#25252526]",
      "hover:bg-[#FF1F3D]",
      "focus:bg-[#FF1F3D]",
      "focus:text-white",
      "hover:text-white",
      "rounded-sm"
    );
    tabContainer.appendChild(tabLink);

    tabLink.onclick = () => {
      loadCardData(element.category_id);
    };
  });

  // Default Show item on display by default id
  if (tabData.length > 0) {
    loadCardData(tabData[0].category_id);
  }
};

const loadCardData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  var cardData = data.data;

  const divContainer = document.getElementById("card-container");
  divContainer.textContent = "";

  cardData.forEach((element) => {
    // Convert second into min and hours
    const time = element.others.posted_date;
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);

    // Create an card and show this card on display
    const div = document.createElement("div");
    div.classList.add("card", "bg-base-100", "shadow-lg");
    div.innerHTML = `
      <div class="relative rounded-lg">
        <figure><img src=${element.thumbnail} class="w-full h-52" /></figure>
        <div id="time-container" class="absolute bottom-1 right-1 p-2 bg-black text-white rounded-lg text-center">
          <p>${h} hrs ${m} min ago</p>
        </div>
      </div>
      <div class="card-body">
        <div class="flex gap-4">
          <div class="avatar">
            <div class="w-10 h-10 rounded-full">
              <img src=${element.authors[0]?.profile_picture} />
            </div>
          </div>
          <div>
            <h2 class="card-title">${element.title}</h2>
            <div class="flex">
              <p class="text-[#171717B3] mr-3">${element.authors[0].profile_name}</p>
              <img id="verified-icon" src="icon/fi_10629607.svg" class="hidden"/>
            </div>
            <p class="text-[#171717B3]">${element.others.views} Views</p>
          </div>
        </div>
      </div>
    `;
    divContainer.appendChild(div);

    // Hide the time container if time === "";
    const timeContainer = div.querySelector("#time-container");
    if (time === "") {
      timeContainer.classList.add("hidden");
    }

    // hide the verified icon if verified = false or empty string
    const icon = div.querySelector("#verified-icon");
    if (element.authors[0].verified === true) {
      icon.classList.remove("hidden");
    }
  });

  // Show the Data not found alert massage
  const noData = document.getElementById("no-data");
  noData.innerText = "";
  if (cardData.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="flex justify-center">
        <figure><img src="./icon/icon.png"/></figure>
      </div>
      <h2 class="text-4xl font-bold mt-8">Oops!! Sorry, There is no <br> content here</h2>
    `;
    noData.appendChild(div);
  }

  // Sort By view section
  document.getElementById("sort-btn").addEventListener("click", function () {
    // Sort Data By clicked sort
    cardData.sort(
      (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
    );

    const divContainer = document.getElementById("card-container");
    divContainer.textContent = "";


      cardData.forEach((element) => {
        // Convert second into min and hours
        const time = element.others.posted_date;
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
    
        // Create an card and show this card on display
        const div = document.createElement("div");
        div.classList.add("card", "bg-base-100", "shadow-lg");
        div.innerHTML = `
          <div class="relative rounded-lg">
            <figure><img src=${element.thumbnail} class="w-full h-52" /></figure>
            <div id="time-container" class="absolute bottom-1 right-1 p-2 bg-black text-white rounded-lg text-center">
              <p>${h} hrs ${m} min ago</p>
            </div>
          </div>
          <div class="card-body">
            <div class="flex gap-4">
              <div class="avatar">
                <div class="w-10 h-10 rounded-full">
                  <img src=${element.authors[0]?.profile_picture} />
                </div>
              </div>
              <div>
                <h2 class="card-title">${element.title}</h2>
                <div class="flex">
                  <p class="text-[#171717B3] mr-3">${element.authors[0].profile_name}</p>
                  <img id="verified-icon" src="icon/fi_10629607.svg" class="hidden"/>
                </div>
                <p class="text-[#171717B3]">${element.others.views} Views</p>
              </div>
            </div>
          </div>
        `;
        divContainer.appendChild(div);
    
        // Hide the time container if time === "";
        const timeContainer = div.querySelector("#time-container");
        if (time === "") {
          timeContainer.classList.add("hidden");
        }
    
        // hide the verified icon if verified = false or empty string
        const icon = div.querySelector("#verified-icon");
        if (element.authors[0].verified === true) {
          icon.classList.remove("hidden");
        }
      });
    });
  };
  

loadTabData();
