export default {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "ESGI API",
    description: "ESGI API Rest",
    contact: {
      name: "ESGI Contact",
      email: "info@esgi.fr",
      url: "https://esgi.fr",
    },
  }, // *

  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};