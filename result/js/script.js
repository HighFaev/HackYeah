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
function getResultData() {
            // Metoda 1: Z localStorage
            const savedData = localStorage.getItem('parsingResult');
            if (savedData) {
                localStorage.removeItem('parsingResult'); // Wyczyść po użyciu
                return JSON.parse(savedData);
            }
            
            // Metoda 2: Z parametrów URL
            const urlParams = new URLSearchParams(window.location.search);
            const resultParam = urlParams.get('result');
            if (resultParam) {
                try {
                    return JSON.parse(decodeURIComponent(resultParam));
                } catch (e) {
                    console.error('Błąd parsowania parametrów URL:', e);
                }
            }
            
            return null;
        }

        // Wyświetl wyniki
        function displayResults(data) {
            const loadingOverlay = document.getElementById('loadingOverlay');
            const resultContent = document.getElementById('resultContent');
            
            loadingOverlay.style.display = 'none';
            
            if (data && data.success) {
                resultContent.innerHTML = `
                    <div class="success">
                        <h3>Parsowanie zakończone sukcesem!</h3>
                        <p><strong>URL:</strong> ${data.url}</p>
                        <p><strong>Wynik:</strong> ${JSON.stringify(data.result)}</p>
                        <p><strong>Czas przetwarzania:</strong> ${data.processingTime || 'nieznany'} ms</p>
                    </div>
                `;
            } else {
                document.querySelector(".resultFail").classList.toggle("error");
                document.querySelector(".resultFail").innerHTML = `
                        <p>${data?.error || 'Unknown error'}</p>
                        <a class="btn" href="../main_page/index.html"><span>go back</span></a>
                `;
            }
        }

        // Symulacja ładowania danych
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const resultData = getResultData();
                displayResults(resultData);
            }, 1500); // Symulacja opóźnienia ładowania
        });
//<======================================================================================
let value = 60;
const val1 = "jjjj";
const val2 = "j222";
const val3 = "j333";

document.getElementById("resSum").innerHTML = val1;
document.getElementById("true").innerHTML = val2;
document.getElementById("notTrue").innerHTML = val3;

function setGaugeValue(pie, value) {
  pie.style.setProperty('--p', value);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  const result = document.querySelector(".pie_result");

  if (value <= 30) {
      result.textContent = "it is a fake";
    } else if (value <= 69) {
      result.textContent = "it is probably a fake";
    } else {
      result.textContent = "it is probably a true";
    }

  pie.innerHTML = `${value}%`;
}

// Example usage
const pie = document.querySelector(".pie");
setGaugeValue(pie, value); // Set initial value to 50%
