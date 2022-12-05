# Node Sessions + Middlewares

En esta práctica haremos un programa que permita a un usuario autentificarse mediante usuario y contraseña (comparada con la base de datos) y guarde en sessión el valor `isAuth=true`


## Analisis

**El usuario NO registrado podrá acceder a las paginas:**

- [http://localhost:3000](http://localhost:3000)
- [http://localhost:3000/info](http://localhost:3000/info)


**El usuario SI registrado podrá acceder a las paginas:**

- [http://localhost:3000/info](http://localhost:3000/info)
- [http://localhost:3000/admin/welcome](http://localhost:3000/admin/welcome)
- [http://localhost:3000/admin/user/10](http://localhost:3000/admin/user/10)
- [http://localhost:3000/admin/user/create](http://localhost:3000/admin/user/create)

## Modificaciones

### Login
En la pagina [http://localhost:3000](http://localhost:3000) crea el formulario de Login que compare user/pass con la base de datos y guarde la información del usuario en session con el siguiente formato:
```
auth={
    isAuth:true, 
    info: {name: 'Usuario', rol:'admin'}
}
```

### Middleware isAuth

Crear **un unico** middleware que filtre a los usuarios que intentan acceder a la ruta **/admin/...**. En el ejercicio solo tenemos dos rutas "admin", pero y si tuvieramos una aplicación con 400 paginas de este tipo¿? Encuentra una manera optima de programarlo.

### Parametros get en la URL
Podemos convertir a paramtros GET información escrita en la URL de nuestra aplicación. Modifica tu aplicación para se acceda a la información del usuario con id=10 al consultar la url:

- [http://localhost:3000/admin/user/10](http://localhost:3000/admin/user/10)

### Formulario Usuario

- [http://localhost:3000/admin/user/create](http://localhost:3000/admin/user/create)

Crea un formulario que inserte a un usuario en la base de datos:

- name
- rol
- timestamp