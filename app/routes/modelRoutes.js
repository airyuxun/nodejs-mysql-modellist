
module.exports = app => {
    var models = require("../models/modelList.js");
    const mUtil = require("../models/modelUtil");
    const cUtil = require("../controllers/controllerUtil");
    var controllerMap = {};

    models.map((m)=>{
        mUtil.make(m);
        var controller = cUtil.make(m);
        controllerMap[m.name] = controller;
        console.log("build model:"+m.name);
    });
    const checkModel = (modelName)=>{
        if(!controllerMap[modelName]){
            return false;
        }
        return true;
    }
    // Create a new 
    app.post("/:modelName",function(req, res){
        if(!checkModel(req.params.modelName)){
            res.json({code:404,message:"model not found"});
            console.log("unknown model requset : " + req.params.modelName);
            return;
        };
        controllerMap[req.params.modelName].create(req,res);
    });
  
    // Retrieve all 
    app.get("/:modelName",function(req, res){
        if(!checkModel(req.params.modelName)){
            res.json({code:404,message:"model not found"});
            console.log("unknown model requset : " + req.params.modelName);
            return;
        };
        controllerMap[req.params.modelName].findAll(req,res);
    });
  
    // Retrieve a single  with od
    app.get("/:modelName/:id",function(req, res){
        if(!checkModel(req.params.modelName)){
            res.json({code:404,message:"model not found"});
            console.log("unknown model requset : " + req.params.modelName);
            return;
        };
        controllerMap[req.params.modelName].findOne(req,res);
    });
  
    // Update a Customer with customerId
    app.put("/:modelName/:id",function(req, res){
        if(!checkModel(req.params.modelName)){
            res.json({code:404,message:"model not found"});
            console.log("unknown model requset : " + req.params.modelName);
            return;
        };
        controllerMap[req.params.modelName].update(req,res);
    } );
  
    // Delete a Customer with customerId
    app.delete("/:modelName/:id",function(req, res){
        if(!checkModel(req.params.modelName)){
            res.json({code:404,message:"model not found"});
            console.log("unknown model requset : " + req.params.modelName);
            return;
        };
        controllerMap[req.params.modelName].remove(req,res);
    } );
  
    // Create a new Customer
    app.delete("/:modelName",function(req, res){
        if(!checkModel(req.params.modelName)){
            res.json({code:404,message:"model not found"});
            console.log("unknown model requset : " + req.params.modelName);
            return;
        };
        controllerMap[req.params.modelName].removeAll(req,res);
    } );
  };
  