<h1 align="center" id="title">Tablica</h1>

<p id="description">Website for posting advertisements / or just random posts. Right now uses placeholder images - planned custom image upload</p><br />

<h2>💻 Built with</h2>

Technologies used in the project:

* React
* NestJS
* Vite
* PostgreSQL
* Docker
* Typescript
* Prisma

<br /> 
<h2>Project Screenshots:</h2><br />

<img src="https://i.imgur.com/OJ2drHQ.png" alt="project-screenshot" width="650" height="300/"><br />

<img src="https://i.imgur.com/szMnELJ.png" alt="project-screenshot" width="650" height="300/"><br />

<img src="https://i.imgur.com/FmBntVv.png" alt="project-screenshot" width="650" height="300/"><br />

<img src="https://i.imgur.com/nNl9xDi.png" alt="project-screenshot" width="650" height="300/"><br /> <br />

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone github repository</p>

```
git clone https://github.com/AdamCala/tablica.git
```

<p>2. Enter the project directory</p>

```
cd /tablica/
```

<p>3. Create docker volume for database</p>

```
docker volume create database
```

<p>4. Build containter</p>

```
docker-compose up -d --build
```

<p>5. Enter the backend container</p>

```
docker exec -it tablica-backend-1 /bin/sh
```

<p>6. Run database migrations</p>

```
npx prisma migrate dev --name init
```
