// categories

const loadCategories = () => {
	fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
		.then((res) => res.json())
		.then((data) => displayCategories(data.categories))
		.catch((error) => console.log(error));
};

function loadCategoryVideos(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
		.then((res) => res.json())
		.then((data) => {
      const btns = document.getElementsByClassName("btn-remove-bg");
      for (const btn of btns) {
        btn.classList.remove("bg-red-400", "text-white");
      }
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("bg-red-400", "text-white");
      displayVideos(data.category);
    })
		.catch((error) => console.log(error));
}

const displayCategories = (categories) => {
	const categoryContainer = document.getElementById("categories");
	categories.forEach((item) => {
		const btnContainer = document.createElement("div");
		btnContainer.innerHTML = `
    <button id = "btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn btn-remove-bg">
    ${item.category}
    </button>
    `

		categoryContainer.append(btnContainer);
	});
};

loadCategories();

// time calculation

function timeConverter(time) {
	const hour = parseInt(time / 3600);
	const minute = parseInt((time % 3600) / 60);
	const second = (time % 3600) % 60;
	return `${hour} hour ${minute} minute ${second} second ago`;
}


// videos

const loadVideos = () => {
	fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
		.then((res) => res.json())
		.then((data) => displayVideos(data.videos))
		.catch((error) => console.log(error));
};

const displayVideos = (videos) => {
	const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class = "mx-auto flex flex-col justify-center items-center gap-4">
      <img src = "assets/Icon.png" />
      <p class = "font-bold text-3xl text-center">
        Oops!! Sorry, There is no content here.
      </p>

    </div>
    `;
    return;
  }
  else{
    videoContainer.classList.add("grid");
  }
	videos.forEach((video) => {
		const card = document.createElement("div");
    card.classList = "card card-compact bg-base-100  shadow-xl";
		card.innerHTML = `
  <figure class= "h-[200px] relative">
    <img class="h-full w-full object-cover"
      src= ${video.thumbnail}
      alt="Shoes" />
      ${
				video.others.posted_date?.length == 0
					? ""
					: `<span class="absolute right-2 bottom-2 bg-black rounded-lg px-2 text-white text-sm">${timeConverter(
							video.others.posted_date
					  )}</span>`
			}
  </figure>
  <div class="card-body flex flex-row">
    <div class="avatar w-10 h-10">
  <div class=" rounded-full">
    <img src=${video.authors[0].profile_picture} />
  </div>
  </div>
    <div>
    <h2 class="card-title">${video.title}</h2>
    <div class="flex items-center gap-2 w-fit">
      <p class="text-gray-500">${video.authors[0].profile_name}</p>
      ${
				video.authors[0].verified == true
					? '<img class="w-5" src= "https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />'
					: ""
			}
    </div>
    </div>
  </div>
    `;
    videoContainer.append(card);
	});
};

loadVideos();
