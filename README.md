<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Stack de desarrollo 
* Nest js
* Mongo db
* Mongoose

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener instalado Nest CLI

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```
5. Clonar el archivo _.env.template_ y renombrar la copia a _.env_

6. Llenar las variables de entorno definidas en _.env_

7. Ejecutar la app en dev

```
npm run start:dev
```

8. Recontruir la base de datos mediante el seed

``` 
http://localhost:3000/api/v1/seed
```

