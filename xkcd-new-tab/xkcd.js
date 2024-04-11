async function getResponse(url) {
    const response = await fetch(url);
    return response.json();
}

async function loadComic() {
    const {num: latest} = await getResponse("https://xkcd.com/info.0.json");
    const random = Math.floor(Math.random() * latest) + 1;
    if (random === 404) {
        return loadComic();
    }

    const url = `https://xkcd.com/${random}`;
    const comic = await getResponse(`${url}/info.0.json`);

    document.getElementById("xtitle").innerText = comic.title;
    document.getElementById("xalt").innerText = comic.alt;

    const img = document.getElementById("ximg");
    img.src = comic.img;
    img.alt = comic.alt;
    img.title = comic.alt;

    const src = document.getElementById("xsrc");
    src.href = url;
    src.innerText = url;

    document.title = `xkcd: ${comic.title}`;
}

document.addEventListener("DOMContentLoaded", loadComic);
