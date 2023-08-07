# ShortURL Web Application

Easily convert lengthy URLs into shorter, more manageable ones for sharing and storage purposes.

## Getting Started

Follow these steps to run the ShortURL Web Application locally:

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org/)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/palmutska/short-url-generator.git

2. **Navigate to the project directory**:
   ```bash
   cd short-url-generator
   
3. **Install required dependencies**:
   ```bash
   npm install
   
4. **Start the server**:
   ```bash
   npm run start

## Tech Stack

**Client:** HTML5, CSS3, JavaScript

**Server:** Node, Express

## Demo

![](https://github.com/palmutska/short-url-generator/assets/41127451/402b217c-62e7-4f57-8976-1fd14e301069)

## Flowcharts

Flowcharts provide a visual representation of the application's architecture and workflow, offering a clear overview of how various components interact and processes flow. Below are the flowcharts that detail the internal workings and structure of this application:

#### GET /
![GET /](https://github.com/palmutska/short-url-generator/assets/41127451/73d65720-dc7e-42a7-a7d3-5270de1c455b)

#### POST /
![POST /](https://github.com/palmutska/short-url-generator/assets/41127451/34c0c8bc-aa75-4322-bb20-2e68b691ad4e)

#### GET /:key
![GET /:key](https://github.com/palmutska/short-url-generator/assets/41127451/bc26dcc3-23fe-43e1-82a5-13d294506d14)

#### GET /links/:key
![GET /links/:key](https://github.com/palmutska/short-url-generator/assets/41127451/487fc767-8c97-4d7a-88d3-03e4907cb12d)

## Usage Note

When generating short URLs in localhost, you might need to remove the protocols from the URLs. For instance, for `https://localhost:4111/21e769`, consider removing "https://".

## License

This project is licensed under the [GNU GPL v3.0 License](https://choosealicense.com/licenses/gpl-3.0/).




