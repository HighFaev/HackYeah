const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add("_touch");
}else{
    document.body.classList.add("_pc");
}

//Burger ==========================================================
const iconMenu = document.querySelector(".menu-header__icon");
if(iconMenu){
    const menuBody = document.querySelector(".menu-header__menu");
    iconMenu.addEventListener("click", function(e) {
        e.preventDefault();
        document.body.classList.toggle("lock");
        iconMenu.classList.toggle("active");
        menuBody.classList.toggle("active");
    });
}
//=================================================================


//Tab switch ======================================================
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab__navitem a");
  const tabContents = document.querySelectorAll(".newsmedia__item");

  tabButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // stop the page from jumping

      // remove active from all buttons
      tabButtons.forEach(btn => btn.classList.remove("active"));

      // add active to the clicked one
      this.classList.add("active");

      // hide all tab contents
      tabContents.forEach(content => content.style.display = "none");

      // show the one that matches href (#tab_01, #tab_02, #tab_03)
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.style.display = "block";
      }
    });
  });

  // trigger the first tab as default
  if (tabButtons.length > 0) {
    tabButtons[2].click();
  }
}); //(Create links to blocks and give this blocks id with links' href)
//================================================================

//Maps ===========================================================

//const styleArray;

function initMap() {
  // Punkt startowy (Warszawa)
  const centrum = { lat: 52.2297, lng: 21.0122 };

  // Tworzymy mapę
  const mapa = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: centrum,
    //styles: styleArray
  });

  // Przykładowy marker
  new google.maps.Marker({
  position: { lat: 52.2297, lng: 21.0122 },
  map: mapa,
  title: "Warszawa - centrum",

  icon: {
  url: "../img/icons/marker.svg",           // ścieżka do obrazka
  scaledSize: new google.maps.Size(24, 29), // szerokość, wysokość w px
  //anchor: new google.maps.Point(20, 40)
  }
});

}
//Сайт https://snazzymaps.com/     (Стили)
/*<script
      async
      defer
      src="https://maps.googleapis.com/maps/api/js?key=YOURKEY&callback=initMap">
    </script>
*/ // Add in html AFTER main script
// In a block where you need create a map add id="map". Don't forget style height and width!!!
//===================================================================
document.getElementById('parseButton').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');
    const url = urlInput.value.trim();

    if (!url) {
        resultDiv.innerHTML = '<p style="color: #A70F0F;">Please, enter link</p>';
        return;
    }

    resultDiv.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Parsowanie w toku...</p>
        </div>
    `;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/parse-text', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                
                // Metoda 1: Przekierowanie z danymi w localStorage
                localStorage.setItem('parsingResult', JSON.stringify({
                    success: true,
                    url: url,
                    result: data,
                    processingTime: Date.now() // lub czas z serwera
                }));
                window.location.href = '../result/result.html';
                
            } else {
                localStorage.setItem('parsingResult', JSON.stringify({
                    success: false,
                    error: `Server error: ${xhr.status}`,
                    url: url
                }));
                window.location.href = '../result/result.html';
            }
        }
    };

    xhr.onerror = function() {
        localStorage.setItem('parsingResult', JSON.stringify({
            success: false,
            error: 'Connection error with the server',
            url: url
        }));
        window.location.href = '../result/result.html';
    };

    xhr.send(JSON.stringify({ url: url }));
});