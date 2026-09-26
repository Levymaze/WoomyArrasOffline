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
            const title = document.createElement("p");
            title.className = "popupTitle";
            title.append(document.createTextNode(alert.title));
            const time = document.createElement("span");
            time.className = "popupTime";
            time.textContent = new Intl.DateTimeFormat('en-us', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date(alert.timeStamp));
            title.appendChild(time);
            const body = document.createElement("p");
            body.className = "popupBody";
            body.textContent = alert.text;
            const closeBtn = document.createElement("button");
            closeBtn.textContent = "Close";
            closeBtn.addEventListener("click", () => closePopup(alert.name));
            const markBtn = document.createElement("button");
            markBtn.textContent = "Mark As Read";
            markBtn.addEventListener("click", () => { markAsRead(alert.name); closePopup(alert.name); });
            popup.append(title, body, closeBtn, markBtn);
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
