# MongoDB GPUs

## Table of Contents
- [About](#about)
- [Docker](#docker)
- [Static build](#static-build)
- [GraphQL operations](#graphql-operations)


## About

Node.js + Express + Apollo GraphQL app, to display a list of graphics cards and calculate their theoretical performance.

[Live demo on Render↗](https://mongodb-gpus.onrender.com)

### Screenshots

**Standard frontend**

<img src="./resources/img/mongodb-gpus-frontend.png" alt="MongoDB GPUs web UI" width="500"/>

**Alternative frontend (built with Material UI)**

<img src="./resources/img/mongodb-gpus-material-ui.png" alt="MongoDB GPUs alternative UI" width="400"/>


## Docker

### Docker Compose

#### Development build (supports hot reloading)

**Note**: the Docker **dev compose orchestration** uses the local Node dependencies in order to run the containers.

- Install dependencies
	```bash
	# Alternate client
	cd ./alternate-client && npm install

	# Main client
	cd ./client && npm install

	# Server
	cd ./server && npm install
	```

- Start the orchestration
	```bash
	docker compose -f ./docker-compose.dev.yml up -d
	```

	- The development build uses a containerized Mongo database for testing, preventing it from affecting the main Mongo database from the cloud server.

- Access the app on:

	- Apollo Sandbox: http://localhost:4000/graphql
  
	- Standard frontend: http://localhost:5173
  
	- Alternative frontend: http://localhost:5174

#### Production build

**Note**: this server container connects to the cloud Mongo database.
	
- Start the orchestration
	```bash
	docker compose up -d
	```

- Access the app on:

	- Apollo Sandbox: http://localhost:8000/graphql

	- Standard frontend: http://localhost:8000
		
	- Alternative frontend: http://localhost:8000/alt

### Individual Docker containers

1. Create a custom network on Docker
    ```bash
    docker network create mongodb-gpus-network
    ```

2. Build the images for both clients
    ```bash
    cd ./client && docker build -t mongodb-gpus-client .
    cd ./alternate-client && docker build -t mongodb-gpus-alt-client .
    ```

3. Build the server image
    ```bash
    docker build -t mongodb-gpus-server .
    ```

4. Create a mongo container to store the data locally
    ```bash
    docker run -d --name mongo --network mongodb-gpus-network mongo
    ```

5. Alternative client
    ```bash
    docker run -d --name mongodb-gpus-alt-client --network mongodb-gpus-network -p 5174:80 mongodb-gpus-alt-client
    ```
    
6. Main client
    ```bash
    docker run -d --name mongodb-gpus-client --network mongodb-gpus-network -p 5173:80 mongodb-gpus-client
    ```

7. Server (development version)
    ```bash
    docker run -d --name mongodb-gpus-server --network mongodb-gpus-network -p 3001:4000 -e <mongodb_env_variable> mongodb-gpus-server
    ```

8. Access the app on

	- Apollo Sandbox: http://localhost:3001/graphql

	- Standard frontend: http://localhost:5173
		
	- Alternative frontend: http://localhost:5174/alt

### Server static build

The server supports serving the static builds for both clients. To run the server in production mode:

1. Build the clients
    ```bash
    cd ./client && npm run build && cp -r ./dist ../server/client
		cd ./alternate-client && npm run build && cp -r ./dist ../server/alt-client
    ```

2. Start the server container
    ```bash
    docker run -d --name mongodb-gpus -p 4000:4000 -e "MONGODB_URI=<mongodb_env_variable>" mongodb-gpus-server
    ```


## Static build

1. Build the client you wish to test (or both)
		```bash
		# Main client
		cd ./client && npm run build

		# Alternate client
		cd ./alternate-client && npm run build
		```

2. Copy the static build to the main server folder
		```bash
		# Main client
		cp -r ./dist ../server/client

		# Alternate client
		cp -r ./dist ../server/alt-client
		```

3. Run the server in production mode
		```bash
		cd ./server && npm install && npm run start
		```

4. Access the app on:
	
	- Apollo Sandbox: http://localhost:4000/graphql
  
	- Web UI: http://localhost:4000


## GraphQL operations

- Get all available data
	```gql
	query allGpus {
		allGpus {
			_id
			manufacturer
			gpuline
			model
			cores
			tmus
			rops
			vram
			bus
			memtype
			baseclock
			boostclock
			memclock
		}
	}
	```

- Get a single GPU via the ID
	```gql
	query FindGpu($findGpuId: ID!) {
		findGpu(id: $findGpuId) {
			_id
			manufacturer
			gpuline
			model
			cores
			tmus
			rops
			vram
			bus
			memtype
			baseclock
			boostclock
			memclock
		}
	}
	```

	- Variables
		```gql
		{
			"findGpuId": "<id>"
		}
		```

- Add a new graphics card
	```gql
	mutation addGpu {
		addGpu(
			manufacturer: "NVIDIA",
			gpuline: "GeForce",
			model: "RTX 3060",
			cores: 3584,
			tmus: 112,
			rops: 48,
			vram: 12,
			bus: 192,
			memtype: "GDDR6",
			baseclock: 1320,
			boostclock: 1777,
			memclock: 15
		) {
			_id
			manufacturer
			gpuline
			model
			cores
			tmus
			rops
			vram
			bus
			memtype
			baseclock
			boostclock
			memclock
		}
	}
	```

	OR (via variables)
	```gql
	mutation addGpu(
		$manufacturer: String!,
		$gpuline: String!,
		$model: String!,
		$cores: Int!,
		$tmus: Int!,
		$rops: Int!,
		$vram: Float!,
		$bus: Int!,
		$memtype: String!,
		$baseclock: Int!,
		$boostclock: Int!,
		$memclock: Float!
	) {
		addGpu(
			manufacturer: $manufacturer, 
			gpuline: $gpuline, 
			model: $model, 
			cores: $cores, 
			tmus: $tmus, 
			rops: $rops, 
			vram: $vram, 
			bus: $bus, 
			memtype: $memtype, 
			baseclock: $baseclock, 
			boostclock: $boostclock, 
			memclock: $memclock
		) {
			_id
			manufacturer
			gpuline
			model
			cores
			tmus
			rops
			vram
			bus
			memtype
			baseclock
			boostclock
			memclock
		}
	}
	```

	- Variables
		```gql
		{
			"manufacturer": "NVIDIA",
			"gpuline": "GeForce",
			"model": "RTX 3060",
			"cores": 3584,
			"tmus": 112,
			"rops": 48,
			"vram": 12,
			"bus": 192,
			"memtype": "GDDR6",
			"baseclock": 1320,
			"boostclock": 1777,
			"memclock": 15
		}
		```

- Remove a GPU
  ```gql
	mutation removeGpu($removeGpuId: ID!) {
  	removeGpu(id: $removeGpuId) {
			id
			manufacturer
			gpuline
			model
			cores
			tmus
			rops
			vram
			bus
			memtype
			baseclock
			boostclock
			memclock
		}
	}
  ```

	- Variables
		```gql
		{
			"removeGpuId": "<id>"
		}
		```

- Update a GPU's specs
  ```gql
  mutation updateGpu($updateGpuId: ID!) {
  	updateGpu(
			id: $updateGpuId
			cores: 960
      tmus: 112
      rops: 96
      vram: 0.5
		) {
      id
      manufacturer
      gpuline
      model
      cores
      tmus
      rops
      vram
      bus
      memtype
      baseclock
      boostclock
      memclock
    }
  }
  ```

	- Variables
		```gql
		{
			"updateGpuId": "<id>"
		}
		```

  - You can update any number of fields in a single query.
