const buildData = (def,req)=>{
    var newModelData = {};
    for(i=0;i<def.length;i++){
        newModelData[def[i]]=req.body[def[i]];
    }
    return newModelData;
}
const  makeController =(model)=>{
    let modelName =  model.name;
    let tableName = model.table;
    let def = model.def;

   var modelController ={
    create:(req, res) => {
        // Validate request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
        
        // Create a modelData
        const mData = buildData(def,req);
      
        // Save modelData in the database
        model.create(mData, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the "+modelName+"."
            });
          else res.send(data);
        });
      },
    findAll:(req, res) => {
        model.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving "+modelName+"."
            });
          else res.send(data);
        });
      },
    findOne:(req, res) => {
        model.findById(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found "+modelName+" with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving "+modelName+" with id " + req.params.id
              });
            }
          } else res.send(data);
        });
      },
    update:(req, res) => {
        // Validate Request
        if (!req.body) {
            res.status(400).send({
            message: "Content can not be empty!"
            });
        }
        
        console.log(req.body);
        const mData = buildData(def,req);
        model.updateById(
            req.params.id,
            mData,
            (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found `+modelName+` with id ${req.params.id}.`
                });
                } else {
                res.status(500).send({
                    message: "Error updating "+modelName+" with id " + req.params.id
                });
                }
            } else res.send(data);
            }
        );
    },
    delete:(req, res) => {
        model.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found `+modelName+` with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete  "+modelName+"  with id " + req.params.id
              });
            }
          } else res.send({ message: modelName+` was deleted successfully!` });
        });
    },
    deleteAll:(req, res) => {
        model.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all "+modelName+" ."
            });
          else res.send({ message: `All `+modelName+` were deleted successfully!` });
        }) 
    } 

   };
   return modelController;
}
module.exports = {make:makeController}

