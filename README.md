# ASEDelivery Webapp

Provides a responsive web application (mobile and desktop), which binds all functionalities of the backends into one place. Like the other repositories there are two ways to run it. First is to set up the WebApp locally with yarn. Second you can also build the docker image locally and then use the docker compose file of the main repository. For the second step you only have to build the docker image.

# Prerequisites:

- Yarn (1.22.5), is in the repository
- Node (16.13.1)
- Docker (for local build and testing)

# Installation:

1. In your root folder, create a file named `.env.development`
2. In the `.env.development` add the following code:

```
SKIP_PREFLIGHT_CHECK=true
REACT_APP_ASE_ENDPOINT=http://localhost:8082
```

4. Run `yarn install` (optional for using docker-compose)

5. To start the application locally, run `yarn start` (optional for using docker-compose)

## Build docker image (needed for docker compose)

To build the container, execute the following command with the IP address of your local computer in the build arg variable 

```
docker build -t ase/webapp:latest --build-arg REACT_APP_ASE_ENDPOINT=http://(your ip iddress):8082 .
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
