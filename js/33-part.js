const popup = document.getElementById("infoPopup");
        const popupTitle = document.getElementById("infoPopup-Title");
        const popupMessage = document.getElementById("infoPopup-Body");
        function fadePopupIn() {
            popup.style.display = "block";
            popup.style.opacity = 0;
            setTimeout(() => {
                popup.style.opacity = 1;
            })
        }
        function fadePopupOut() {
            let waitTime = Number(window.getComputedStyle(document.body).getPropertyValue("--transition-time").replace(/[^\d]/g, '')) * 10
            popup.style.opacity = 0;
            setTimeout(() => {
                popup.style.display = "none";
                document.getElementById("openLinkTabButton").style.display = "none"
            }, waitTime)
        }
        function openLink(info, link) {
            fadePopupIn()
            popupTitle.textContent = "Open in new tab?"
            popupMessage.textContent = `Would you like to open \n"${link}"\n (${info})\n in a new tab?`
            document.getElementById("openLinkTabButton").style.display = "block"
            document.getElementById("openLinkTabButton").onclick = () => {
                window.open(link, '_blank').focus();
            }
        }
        function displayMission() {
            fadePopupIn()
            popupTitle.textContent = "The Propose";
            popupMessage.textContent = "I started modding woomy for my own playing but a lot people asking that they want to try it out. The modded version with growth is now available to play on this domain";
        }
        function displayDisclaimer() {
            fadePopupIn()
            popupTitle.textContent = "Disclaimer";
            popupMessage.textContent = "I am NOT affiliated with the original Developers of Woomy-arras.io, This is a modded version of woomy-offline, you can play the original woomy-offline 'woomyarras.vercel.app' This web address is not hosted by Levymaze.";
        }
        function displayControls() {
            fadePopupIn()
            popupTitle.textContent = "Controls";
            popupMessage.innerText = `
            E - Autofire \n
            C - Autospin \n
            O - Reverse mouse \n
            R - Turret/Drone Override \n
            N - Level Up \n
            M+<stat number> - Max out that stat \n
            U - Show upgrade tree \n
            Arrow Keys (with upgrade tree open) - Pan upgrades
            WASD - Move around \n
            Space/left click - Shoot
            `;
        }
