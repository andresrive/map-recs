# Map Recs

Segundo proyecto en equipo, bootcamp web development en IronHack.

## Sobre nosotros

Somos Andres, Roberto y Eugenio, somos compañeros del bootcamp y estamos desarrollando una plataforma para compartir informacion entre usuarios.

## Deployment

You can play the game [here](#)

## Estructura de trabajo

Organizamos nuestro trabajo en [Trello](#)

## Guia de instalación

- Frok this repo.
- Clone this repo.

cd map-recs
npm install

## Models
```js
const User = new Schema ({
    name: { type: String, required: true },
    password: {type: String, required: true },
    city: {type: String, required: true },
    image: String,
    info: String,
    pinPersonal: [ { type: Schema.Types.ObjectId, ref: "Post" } ],
    pinFav: [ { type: Schema.Types.ObjectId, ref: "Comment" } ],
    admin: Boolean,
})
```
```js
const Post = new Schema ({
    image: String,
    namePlace: {type: String, required: true },
    nameCategory: {type: String, required: true },
    direction: {type: String, required: true },
    comment: {type: String, required: true },
    usersComments: [ { type: Schema.Types.ObjectId, ref: "User" } ],
    author: [ { type: Schema.Types.ObjectId, ref: "User" } ],
})
```
```js
const Comment = new Schema ({
    title: {type: String, required: true },
    comment: {type: String, required: true },
    image: String,
    author: [ { type: Schema.Types.ObjectId, ref: "User" } ],
})
```
## Roles de usuarios

|  Clase   |                    Permisos                        | Propiedades |
| :------: | -------------------------------------------------- | ----------- |
|   User   | Puede: login/logout, crear, leer, comentar otros   |   admin:    |
|          |  posts y editar sus propios posts                  |    false    |
| -------- | -------------------------------------------------- | ----------- |
|          | Puede: login/logout, crear, leer, comentar, editar |   admin:    |
|   Admin  | borrar cualquier comentario o post                 |    true     |
|          | (opcional: expulsar uusuarios)                     |             |
| -------- | -------------------------------------------------- | ----------- |

## Rutas

| Metodo |   endPoint    |     Requiere     |       Accion     |
| :----: | ------------- | ---------------- | ---------------- | 
|   GET  |      /        |                  | Carga el home    |
