document.getElementById("videoForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userName = document.getElementById("userName").value.trim();
    const videoLink = document.getElementById("videoLink").value.trim();
    const embedLink = getEmbedLink(videoLink);

    if (userName && embedLink) {
        addVideoToCommunity(userName, embedLink);
        document.getElementById("videoForm").reset();
    } else {
        alert("Por favor, insira um nome válido e um link válido.");
    }
});

function getEmbedLink(url) {
    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname.includes("youtube.com") || parsedUrl.hostname.includes("youtu.be")) {
            const videoId = parsedUrl.searchParams.get("v") || parsedUrl.pathname.split("/").pop();
            return `https://www.youtube.com/embed/${videoId}`;
        }

        if (parsedUrl.hostname.includes("instagram.com")) {
            const pathParts = parsedUrl.pathname.split("/");
            if (pathParts.includes("reel") || pathParts.includes("p")) {
                return `https://www.instagram.com/${pathParts[1]}/${pathParts[2]}/embed/`;
            }
        }

        if (parsedUrl.hostname.includes("tiktok.com")) {
            const videoId = parsedUrl.pathname.split("/").pop();
            return `https://www.tiktok.com/embed/${videoId}`;
        }

        if (parsedUrl.hostname.includes("x.com") || parsedUrl.hostname.includes("twitter.com")) {
            return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
        }

        return null;
    } catch (error) {
        console.error("Erro ao processar o link:", error);
        return null;
    }
}

function addVideoToCommunity(userName, embedLink) {
    const container = document.getElementById("videos-container");
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";
    videoItem.innerHTML = `
        <iframe 
            src="${embedLink}" 
            allowfullscreen 
            style="width: 500px; height: 800px; border: none; border-radius: 8px;">
        </iframe>
        <div class="username">Postado por: ${userName}</div>
    `;
    container.appendChild(videoItem);
}
