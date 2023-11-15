# Simple Cache API

This API provides a caching service using Redis as the underlying cache database and while simple, it has an authorization system which makes use of a Bearer token(provided by the API), making access to stored data and api secure.

| Status | Documentation | Tests |
| :---: | :---: | :---: |
| **Completed** | **Functional** | **Missing** |

## TODO

| Subject | Status |
| :--- | :---: |
| Rate Limit | **DONE** |
| Roles System | **To implement** |
| Tests | **To implement** |
| Better Error Responses | **To implement** |

## Main Tecnologies

- [Nestjs](https://docs.nestjs.com)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Redis Commander](https://github.com/joeferner/redis-commander)

## Local Testing Requirements

- [Docker](https://docs.docker.com/engine/install/)
- [Nodejs](https://nodejs.org/en/download)
- [Git](https://git-scm.com/downloads)

The following versions of the technologies mentioned above have been used in the development of this project:

- Docker - v24.0.7
- Nodejs - v21.1.0
- Git - v2.39.2

## Setup

> This setup works for Linux based systems, if your system is different, please follow the specific steps for it where applicable.

> Windows setup might be added later

First, it is necessary to download the project, you can do it with the following code:

`git clone https://github.com/LucasTody3535/cache-api.git`

After that, cd into it:

`cd cache-api`

and install the dependencies:

`npm i`

In the root of the project(where you are now) there is a docker compose config(**docker-compose.yml**), which contains two images configs: redis and redis-commander, the first one is necessary for the system, without it the system will not work as it tries to connect in the port where it expects Redis to be accessible in the startup. The second one is similar to the H2 Database, which is a Browser app which lets us access the Redis database, manipulate the registries and so on. In the root run the following:

`sudo docker compose up -d`

> The docker must run with sudo prefix, as it requires root privileges, it can be run without using sudo as they say [here](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) but it is out of the scope of this setup.

The docker compose will read our **docker-compose.yml** file in the root of our project, download the images if they not are installed and run them in the background(the **-d** flag)

You can check if the containers started with the command:

`sudo docker ps`

This command will list all services started by docker compose

Now it is necessary to configure the redis env variables, to do so, create an empty **.env** file in the root of the project, in the terminal(keep in mind that you can use any graphical app such the file explorer to create the file) you can make this running:

`> .env`

This is a Linux I/O action called [**redirection**](https://tldp.org/LDP/abs/html/io-redirection.html)

Inside the file you MUST define two environment variables:

- **REDIS_HOST**: The host where redis server is running, in this example can be **localhost(Or 127.0.0.1)** which will be our machine

- **REDIS_PORT**: The port where redis can be accessed, by default is used the port **6379**

After this setup you can run:

`npm run start`

This will start our nestjs app

After all those steps, the following endpoints are accessible:

- [http://localhost:3000](http://localhost:3000) - This is where our nestjs app lies
  - [/tokens](http://localhost:3000/tokens) -> Token related services
  - [/registries](http://localhost:3000/registries) -> Registries related services
- [http://localhost:6379](http://localhost:6379) - This is where the redis server is accessible
- [http://localhost:8081](http://localhost:8081) - This is where the redis commander is
- [http://localhost:3000/api](http://localhost:3000/api) - This is where the Swagger docs are accessible

To stop the docker containers, you need to run `sudo docker compose stop` in the root of the project

You can use to test the api the Swagger browser app, [Postman](https://www.postman.com/) or another tool, this depends entirely on your preference

## Routes

Now it will be covered a little about each endpoint

### _**/tokens**_

This route only have a **Get** request type and it is used to obtain a token
provided by the api, this token is important as it is required for subsequent requests to other endpoints in the application

### _**/registries**_

This route has a **Post** and **Get** request types

For both routes there is a **constraint of 10 request per minute**, if this limit is reached, the service will be inacessible until 1 minute has passed.

**Post**

This endpoint expects the client to send in the Authorization header the value provided from /tokens, if it is not present, the access is restricted.

Furthermore it is necessary to send the data which will be stored in the database along with the id associated with it, if it is an invalid type, an error is thrown and the operation is stopped. The id is used to create a unique key
combining both uuid and the id.

It is important to say that the system **only accepts registries of size of 1mb(or 1,048,576 B) bytes or less** to store in the database, it could change in the future.

**Data layout**

```http
Authorization: Bearer <token>
```

```json
{
  "cacheId": "user01",
  "data": { "name": "John Doe"}
}
```

**Get**

This endpoint expects the client to send in the Authorization header the value provided from /tokens, if it is not present, the access is restricted.

Furthermore, it is necessary to pass the cacheId as a query parameter, as along with uuid inside token, both are used to create the unique cache key in the redis database.

**Data layout**

```http
Authorization: Bearer <token>
```

Example o URL:

- https://localhost:3000/registries?cacheId=user01

## Tests

> To be added...