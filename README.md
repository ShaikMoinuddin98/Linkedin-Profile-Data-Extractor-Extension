# LinkedIn Profile Data Extractor Chrome Extension

This Chrome extension allows users to extract data from LinkedIn profiles and save it to a server. The extracted data includes the profile name, link, bio, about section, location, connections, and followers.

## Features

- Extracts key data from LinkedIn profiles.
- Sends extracted data to a server for storage.
- Displays success or error messages based on the server response.

## Prerequisites

- Node.js and npm installed
- MySQL server running
- Chrome browser

## Installation

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/ShaikMoinuddin98/Linkedin-Profile-Data-Extractor-Extension.git
    cd Linkedin-Profile-Data-Extractor-Extension
    ```

2. Install the dependencies:
    ```sh
    npm install body-parser express sequelize
    ```

3. Configure MySQL Database:
    - Ensure you have a MySQL database named `atg`.
    - Update the Sequelize configuration in `index.js` if necessary:
      ```js
      const sequelize = new Sequelize('atg', 'root', 'yourpassword', {
          host: 'localhost',
          dialect: 'mysql'
      });
      ```

4. Run the server:
    ```sh
    node index.js
    ```

### Chrome Extension Setup

1. Navigate to `chrome://extensions/` in your Chrome browser.
2. Enable "Developer mode" by toggling the switch in the top right corner.
3. Click on the "Load unpacked" button and select the directory where the extension files (`popup.html`, `popup.js`, `manifest.json`, etc.) are located.

## Usage

1. Open LinkedIn and navigate to a profile page.
2. Click on the Chrome extension icon.
3. Click the "Extract Data" button in the popup.
4. The data will be sent to your server and you will receive a success or error message.

## File Structure

