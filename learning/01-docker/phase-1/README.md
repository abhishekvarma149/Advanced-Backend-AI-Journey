# Docker Fundamentals 🐳

## Overview

Docker is a containerization platform that allows developers to package applications along with their dependencies into portable and lightweight containers.

This section covers:

* Images & Containers
* Dockerizing Node.js Applications
* Port Mapping
* Docker Compose
* Docker Networking
* Docker Volumes

---

# 1. Images & Containers

## What is an Image?

A Docker Image is a read-only template used to create containers.

Characteristics:

* Immutable
* Contains application code and dependencies
* Can be shared through registries such as Docker Hub

Example:

```bash
docker pull nginx
```

Downloads the Nginx image.

---

## What is a Container?

A Container is a running instance of a Docker Image.

Characteristics:

* Isolated environment
* Lightweight
* Portable
* Can be started, stopped, and removed

Example:

```bash
docker run nginx
```

Creates and runs a container from the Nginx image.

---

## Image vs Container

| Image        | Container                          |
| ------------ | ---------------------------------- |
| Blueprint    | Running instance                   |
| Read-only    | Read-write                         |
| Static       | Dynamic                            |
| Created once | Can create multiple from one image |

---

# 2. Dockerizing a Node.js Application

## Sample Dockerfile

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

## Build Image

```bash
docker build -t node-app .
```

---

## Run Container

```bash
docker run node-app
```

---

# 3. Port Mapping

Port Mapping allows communication between the host machine and the container.

Syntax:

```bash
docker run -p HOST_PORT:CONTAINER_PORT image-name
```

Example:

```bash
docker run -p 3000:3000 node-app
```

Meaning:

* Host Port → 3000
* Container Port → 3000

Now the application can be accessed from:

```text
http://localhost:3000
```

---

# 4. Docker Compose

Docker Compose helps manage multiple containers using a single configuration file.

Example:

```yaml
version: '3'

services:
  app:
    build: .
    ports:
      - "3000:3000"

  redis:
    image: redis
```

---

## Common Commands

Start Services:

```bash
docker-compose up
```

Run in Background:

```bash
docker-compose up -d
```

Stop Services:

```bash
docker-compose down
```

---

# 5. Docker Networking

Docker Networking allows containers to communicate with each other.

Example:

```bash
docker network create my-network
```

Run containers inside the network:

```bash
docker run --network my-network redis
```

```bash
docker run --network my-network node-app
```

Benefits:

* Service discovery
* Container communication
* Isolation

---

# 6. Docker Volumes

Volumes provide persistent storage for containers.

Without volumes:

* Data is lost when the container is removed.

With volumes:

* Data persists across container restarts.

Create Volume:

```bash
docker volume create my-volume
```

Use Volume:

```bash
docker run -v my-volume:/data nginx
```

---

## Why Use Volumes?

* Persistent storage
* Database data retention
* File sharing between containers
* Backup and recovery

---

# Common Docker Commands

## List Images

```bash
docker images
```

## List Running Containers

```bash
docker ps
```

## List All Containers

```bash
docker ps -a
```

## Stop Container

```bash
docker stop <container_id>
```

## Remove Container

```bash
docker rm <container_id>
```

## Remove Image

```bash
docker rmi <image_id>
```

---

# Key Learnings

* Images are templates used to create containers.
* Containers are isolated running instances of images.
* Dockerfiles define how images are built.
* Port mapping exposes container applications to the host machine.
* Docker Compose simplifies multi-container applications.
* Docker Networking enables communication between containers.
* Docker Volumes provide persistent storage.
* Docker helps build portable and reproducible development environments.
