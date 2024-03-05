export const mailPresentation = () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registro Exitoso</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1 {
    text-align: center;
    color: #333;
  }
  p {
    color: #666;
    line-height: 1.5;
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 20px;
  }
  .button:hover {
    background-color: #0056b3;
  }
</style>
</head>
<body>
<div class="container">
  <h1>¡Registro Exitoso!</h1>
  <p>Bienvenido/a a nuestro sitio. Tu registro se ha completado con éxito.</p>
  <p>Ahora puedes comenzar a disfrutar de nuestros servicios.</p>
  <a href="http://localhost:8888/users/login" class="button">Iniciar sesión</a>
</div>
</body>
</html>
`;
