// popup.js



document.addEventListener('DOMContentLoaded', function () {
  const extractDataBtn = document.getElementById('extractDataBtn');

  extractDataBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs)
      if (tabs && tabs.length > 0) {
        const activeTab = tabs[0];
        console.log(tabs)

        chrome.scripting.executeScript({

          target: { tabId: activeTab.id },
          function: extractDataFromLinkedInProfiles,

        });


      }
      else {
        console.error('No active tab found.');
      }
    });
  });
});

function extractDataFromLinkedInProfiles() {
  // Function to extract data from LinkedIn profiles
  //extracting the data using selectors from linkedin profile page
  let name = document.querySelector(".t-24")
  let connections = document.querySelector(".DcGtcHGQtTkqBnYaUnNwMbnjThhhnAiGslM")
  let connects = connections.childNodes[4].innerText
  let about = document.querySelector(".khBnRjVIXCYirVFIMdnfnUqaXbtNZPxGUdysw")
  let bio = document.querySelector(".CAAEaVJykYggesIuSfNeQJIlaxXPywBCqmk").childNodes[5].innerText
  let location = document.querySelectorAll(".CAAEaVJykYggesIuSfNeQJIlaxXPywBCqmk")[1].childNodes[3].innerText
  let followers = document.querySelector(".DDqKBVMyAjecFPGbPZGpRLhziEzsbKMdeMk").childNodes[1].innerText


  //sending the data to our server
  fetch('http://localhost:9000/linkedinsave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "name": name.innerText, "link": window.location.href, "connections": connects, "about": about.innerText, "bio": bio, "location": location, "followers": followers })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to post data to the server');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data posted successfully:', data);
      alert('Data posted successfully!');
      

    })
    .catch(error => {
      console.error('Error posting data:', error);
      alert('Failed to post data to the server');
    });


}

