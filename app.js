const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

// Set up the express app
const app = express();
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let memoryList = [];


app.use(cors());

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateKey() {
    let key = getRandomInt(99999);
    while (memoryList.find(item => item.id == key)) {
        key = getRandomInt(99999);
    }
    return key;
}



app.get("/api/v1/list", (req, res) => {
    return res.status(200).send({
        list: memoryList
    });
});

app.get("/api/v1/single/:id", (req, res) => {
    // Retrieve the tag from our URL path
    var id = req.params.id;

    if (id == null) {
        return res.status(400).send({
            message: "No id found"
        });
    }

    let obj = memoryList.find(item => item.id == id);

    if (obj == null) {
        return res.status(404).send({
            message: "No item found"
        });
    } else {
        return res.status(200).send({
            item: obj
        });
    }

});

app.post("/api/v1/add", (req, res) => {
    let obj = null;
    if (!req.body) {
        return res.status(400).send({
            message: "No object found"
        });
    } else {
        try {

            obj = JSON.parse(JSON.stringify(req.body));
            obj.id = generateKey();

        } catch (error) {
            return res.status(400).send({
                message: "Error parsing object"
            });
        }
    }

    if (obj != null) {
        memoryList.push(obj);
    }

    return res.status(200).send({
        message: "item added successfully",
        item: obj
    });
});

app.put("/api/v1/update", (req, res) => {
    let obj = null;
    if (!req.body) {
        return res.status(400).send({
            message: "No object found"
        });
    } else {
        if (req.body.id != null) {
            try {

                obj = JSON.parse(JSON.stringify(req.body));

                let memoryObj = memoryList.find(item => item.id == obj.id);

                if (memoryObj == null) {
                    return res.status(400).send({
                        message: "No object found with this id"
                    });
                }

                const index = memoryList.indexOf(memoryObj);
                memoryList[index] = obj;

            } catch (error) {
                return res.status(400).send({
                    message: "Error parsing object"
                });
            }
        } else {
            return res.status(400).send({
                message: "No id found in object"
            });
        }
    }

    return res.status(200).send({
        message: "item updated successfully",
        item: obj
    });
});

app.delete("/api/v1/delete/:id", (req, res) => {
    // Retrieve the tag from our URL path
    var id = req.params.id;

    if (id == null) {
        return res.status(400).send({
            message: "No id found"
        });
    }

    let obj = memoryList.find(item => item.id == id);

    if (obj == null) {
        return res.status(404).send({
            message: "No item found"
        });
    } else {
        const index = memoryList.indexOf(obj);
        memoryList.splice(index,1);
        return res.status(200).send({
            message: 'Item removed successfully'
        });
    }

});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

