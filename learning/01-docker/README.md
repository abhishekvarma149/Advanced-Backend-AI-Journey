# Docker Basics - Notes

## What is Docker?

Docker is a containerization platform that allows developers to package applications and their dependencies into lightweight, portable units called containers.

Benefits:

* Consistent development environment
* Faster deployment
* Better resource utilization
* Easy scalability
* Platform independent

---

## Docker Architecture

### Docker Client

The Docker Client is the interface through which users interact with Docker.

Examples:

```bash
docker build
docker run
docker ps
```

### Docker Daemon

The Docker Daemon (`dockerd`) is the background service that:

* Builds images
* Creates containers
* Manages networks
* Manages volumes

### Docker Registry

A registry stores Docker images.

Examples:

* Docker Hub
* AWS ECR

### Docker Host

The machine where Docker is installed and containers are executed.

---

## Docker Workflow

1. Create a Dockerfile.
2. Build an Image from the Dockerfile.
3. Run a Container from the Image.
4. Docker Daemon manages the container execution.

Flow:

Developer → Docker Client → Docker Daemon → Image → Container

---

## Image vs Container

| Image                        | Container                    |
| ---------------------------- | ---------------------------- |
| Blueprint of an application  | Running instance of an image |
| Read-only                    | Read-write                   |
| Static                       | Dynamic                      |
| Created using Dockerfile     | Created using `docker run`   |
| Can have multiple containers | Runs one application process |

### Real World Example

Image = Class

Container = Object

Example:

```bash
docker pull nginx
```

Downloads the Nginx image.

```bash
docker run nginx
```

Creates and starts a container from the image.

You can create multiple containers from the same image.

---

## Common Docker Commands

### List Images

```bash
docker images
```

### Pull Image

```bash
docker pull nginx
```

### Run Container

```bash
docker run nginx
```

### List Running Containers

```bash
docker ps
```

### List All Containers

```bash
docker ps -a
```

### Stop Container

```bash
docker stop <container_id>
```

### Remove Container

```bash
docker rm <container_id>
```

### Remove Image

```bash
docker rmi <image_id>
```

---

## Key Learnings

* Docker helps package applications and dependencies together.
* Images act as templates for containers.
* Containers are running instances of images.
* Docker Client communicates with Docker Daemon.
* Docker Registries store and distribute images.
* Multiple containers can be created from a single image.
