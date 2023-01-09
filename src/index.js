require("dotenv").config();
const express = require("express");
const router = require("./routes/index.js");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors({ origin: `*`, optionsSuccessStatus: 200 }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(router);

router.use(function (error, req, res, next) {
	if (error.message === "Post already exists") {
		return res.status(409).send(error.message);
	}
	if (error.message === "Post not found") {
		return res.status(404).send(error.message);
	}
	res.status(500).send(error.message);
});

app.listen(process.env.PORT, () => console.log("Serviço ligado"));
