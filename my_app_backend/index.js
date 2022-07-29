const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { response } = require("express");
// const mongoose = require('mongoose')
require("dotenv").config();

const APP_PORT = process.env.PORT || 8081;

const app = express();
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connection.once('open', ()=>{
//     console.log('connect to mongodb');
// });

let bills = [
  {
    id: 1,
    billDate: "2022-07-01",
    paidDate: "2022-07-05",
    unitsConsumed: "10",
    amount: "200",
  },
  {
    id: 2,
    billDate: "2022-10-03",
    paidDate: "2022-10-07",
    unitsConsumed: "15",
    amount: "300",
  },
];

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (_, response) => {
  response.send("Welcome to exela backend");
});

//GET Request for 1
app.get("/get_bills", (_, response) => {
  response.status(200).json(bills);
});

//GET Request 2
app.get("/get_bills/:id", (request, response) => {
  if (bills?.length > 0) {
    const data_to_be_fetched = bills?.find(
      (bill) => bill?.id === parseInt(request?.params?.id)
    );
    if (data_to_be_fetched) {
      response.status(200).json(data_to_be_fetched);
    } else {
      response?.sendStatus(404);
    }
  } else {
    response?.sendStatus(404);
  }
});

//POST Request 1
app.post("/add_bill", (request, response) => {
  let new_id = -1;
  if (Object.keys(request.body)?.length === 0) {
    response.sendStatus(400);
  } else {
    if (bills?.length > 0) {
      new_id = bills[bills?.length - 1].id + 1;
    } else {
      new_id = 1;
    }
    bills.push({
      ...request.body,
      id: new_id,
    });
    response.status(201).json({
      id: new_id,
    });
  }
});

//PUT Request 1
app.put("/update_bill/:id", (request, response) => {
  const data_to_be_modified = bills?.find(
    (bill) => bill?.id === parseInt(request?.params?.id)
  );
  if (!data_to_be_modified) {
    response?.sendStatus(404);
  } else if (Object.keys(request.body)?.length === 0) {
    response.sendStatus(400);
  } else {
    bills = [
      ...bills?.filter((bill) => bill?.id !== parseInt(request?.params?.id)),
      {
        ...data_to_be_modified,
        ...request.body,
      },
    ];
    response?.sendStatus(204);
  }
});

//DELETE Request 1
app.delete("/delete_bill/:id", (request, response) => {
  const data_to_be_deleted = bills.filter(
    (bill) => bill.id === parseInt(request?.params?.id)
  );
  if (!data_to_be_deleted) {
    response?.sendStatus(404);
  } else {
    bills = [
      ...bills.filter((bill) => bill.id !== parseInt(request?.params?.id)),
    ];
    response.sendStatus(200);
  }
});

app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);
});
