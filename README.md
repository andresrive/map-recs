# Map Recs

Segundo proyecto en equipo, bootcamp web development en IronHack.

## Sobre nosotros

Somos Andres, Roberto y Eugenio, somos compañeros del bootcamp y estamos desarrollando una plataforma para compartir informacion entre usuarios.

## Deployment

Aqui puedes probar la app [here](https://map-recs.fly.dev/)

## Estructura de trabajo

Organizamos nuestro trabajo en [Trello](#)

## Guia de instalación

- Frok this repo.
- Clone this repo.

cd map-recs
npm install

## Models

```js
const User = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  image: String,
  info: String,
  pinPersonal: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  pinFav: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  admin: Boolean,
});
```

```js
const Post = new Schema({
  image: String,
  namePlace: { type: String, required: true },
  nameCategory: { type: String, required: true },
  direction: { type: String, required: true },
  comment: { type: String, required: true },
  usersComments: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
});
```

```js
const Comment = new Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  image: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});
```

## Roles de usuarios

|  Clase   |                      Permisos                      | Propiedades |
| :------: | :------------------------------------------------: | :---------: |
|   User   |  Puede: login/logout, crear, leer, comentar otros  |   admin:    |
|          |          posts y editar sus propios posts          |    false    |
| -------- | -------------------------------------------------- | ----------- |
|          | Puede: login/logout, crear, leer, comentar, editar |   admin:    |
|  Admin   |         borrar cualquier comentario o post         |    true     |
|          |           (opcional: expulsar uusuarios)           |             |

## Rutas

| Metodo |     endPoint     |                  Requiere                   |                  Accion                  |
| :----: | :--------------: | :-----------------------------------------: | :--------------------------------------: |
|  GET   |        /         |                                             |              Carga el home               |
|  GET   |     /singup      |                                             |             Carga el Sing Up             |
|  POST  |     /singup      |   const {name, password, city} = req.body   |  Registra el usuario y redirije a login  |
|  GET   |      /login      |                                             |             Carga el Log in              |
|  POST  |      /login      |      const {name, password} = req.body      |     Conecta a un usuario registrado      |
|  GET   |       /map       |                                             |    Carga la pagina principal con mapa    |
|  GET   |      /list       |                                             |   Carga la pamgina principal en lista    |
|  GET   |   /profile/:id   |           const {id} = req.params           | Carga el perfil del usuario seleccionado |
|  POST  |   /pofile/:id    |           const {id} = req.params           |  Creacion/edicion del perfil de usuario  |
|  GET   |       /new       |                                             |    Carga el formulario de nuevo post     |
|  POST  |       /new       |  const {namePlace, nameCategory, direction  |            Crea un nuevo post            |
|        |                  |             comment} = req.body             |                                          |
|  GET   |    /post/:id     |           const {id} = req.params           |        Carga el post seleccionado        |
|  GET   |  /post/:id/edit  |           const {id} = req.params           |       Carga el form de editar post       |
|  POST  |    /post/:id     |     const {id, namePlace, nameCategory,     |       Edita el post seleccionado.        |
|        |                  | direction, comment} = req.params + req.body |                                          |
|  POST  | /post/:id/delete |           const {id} = req.params           |             Elimina un post              |
