## Node.js Koa Service

This service is a Node.js application that uses the Koa framework, Massive.js for PostgreSQL integration, and Winston for logging. It also uses the custom library for reading environment variables.

## Getting Started

### Prerequisites

- Node.js and npm or yarn installed 
- PostgreSQL database set up

### Installation
Step 1: Clone the repository
`git clone https://github.com/YOUR-REPO-URL.git`

Step 2: Install dependencies

`npm install` or `yarn`

### Configuration
The `config` directory contains certain files
- **default.js** - This file contains all the configurations. It is recommended to read properties from envonronment to avoid maintaining multiple environments files in the code itself
- **<NODE_ENV>.js** - These files are environment specific. Configurations of these files will take precedence over configurations added in default.js
- **index.js** - Main index file that will be imported by all other modules.

### Start up
Create a localhost.sh file in the root directory of the project. This localhost.sh is for your development use only. This file is not to be committed to version control. All the necessary environment variables will be exported via this file. For production, use your own methods to upload environment variables. If you are using windows, use bash to run this file.

```
export PORT=<YOUR-SERVER-PORT>

export DB_HOST=<YOUR-DB-HOST>
export DB_PORT=<YOUR-DB-PORT>
export DB_NAME=<YOUR-DB-NAME>
export DB_USER=<YOUR-DB-USER>
export DB_PASSWORD=<YOUR-DB-PASSWORD>

npm start
```
then use `sh localrun.sh` to start the server.

### Logging

The service uses Winston for logging and logs will be stored in the logs directory.

### Built With

- [Koa](https://github.com/koajs/koa/blob/HEAD/docs/guide.md) - Node.js web framework
- [Massive.js](https://massivejs.org/) - Node.js PostgreSQL ORM
- [Winston](https://github.com/winstonjs/winston) - Logging library for Node.js