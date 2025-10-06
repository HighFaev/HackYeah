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
let value = +34;
const val1 = "jjjj";
const val2 = "https://www.bbc.com/news/articles/cr5r76e127do";
const val3 = "j333";

document.getElementById("resSum").innerHTML = "The Israel-Palestinian conflict is one of the longest-running and most violent disputes in the world, with its origins dating back more than a century. The conflict began in the early 20th century, when the British took control of Palestine, a region with an Arab majority and a Jewish minority...";
//document.getElementById("true").innerHTML = val2;
//ocument.getElementById("notTrue").innerHTML = val3;

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
