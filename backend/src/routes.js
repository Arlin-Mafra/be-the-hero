const express = require("express");
const routes = express.Router();

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

//session
routes.post("/sessions", SessionController.create);

// ongs
routes.post("/ongs", OngController.store);
routes.get("/ongs", OngController.index);

// incident
routes.post("/incidents", IncidentController.store);
routes.get("/incidents", IncidentController.index);
routes.delete("/incidents/:id", IncidentController.delete);

//profile
routes.get("/profile", ProfileController.index);

module.exports = routes;
