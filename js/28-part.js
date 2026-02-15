(function() {
    try {
        //if (!["localhost", "woomy.surge.sh", "", "woomy-arras.netlify.app"].includes(location.hostname)) {
            //location.href = "https://woomy.surge.sh";
        //}

        function loadFromStorage() {
            return (localStorage.getItem("popups") || "").split(",");
        }

        window.markAsRead = function markAsRead(item) {
            localStorage.setItem("popups", [...loadFromStorage(), item].join(","));
        }

        window.closePopup = function closePopup(item) {
            let waitTime = Number(window.getComputedStyle(document.body).getPropertyValue("--transition-time").replace(/[^\d]/g, ''))*10
            let popup = document.getElementById(item);
            popup.style.opacity = 0;
            setTimeout(()=>{
                document.getElementById("popupContainer").removeChild(popup);
            }, waitTime)
        }

        function postAlert(alert) {
            if (loadFromStorage().includes(alert.name)) {
                return;
            }
            console.log(alert);
            const popup = document.createElement("div");
            popup.classList.add("popup");
            popup.id = alert.name;
            popup.innerHTML += `<p class="popupTitle">${alert.title}<span class="popupTime">${new Intl.DateTimeFormat('en-us', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date(alert.timeStamp))}</span></p><p class="popupBody">${alert.text}</p><button onclick="closePopup('${alert.name}');">Close</button><button onclick="markAsRead('${alert.name}');closePopup('${alert.name}');">Mark As Read</button>`;
            popup.style.opacity = 0;
            document.getElementById("popupContainer").appendChild(popup);
            setTimeout(()=>{
                popup.style.opacity = 1;
            })
        }
        fetch("https://pine-mint-smartphone.glitch.me/announcements.json").then(r => r.json()).then(json => json.announcements.forEach(postAlert));
    } catch (e) {
        console.log("Error with preloads!");
    }
})();
