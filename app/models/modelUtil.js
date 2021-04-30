const sql = require("./db.js");
//model={name:"modelUser",table:"model_user",def:["id","name","title","sex"]}
const makeModel = function(model){
    let modelName =  model.name;
    let tableName = model.table;
    let def = model.def;
    model.create = (modelData, result) => {
    sql.query("INSERT INTO "+tableName+" SET ?", modelData, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created "+modelName+": ", { id: res.insertId, ...modelData });
      result(null, { id: res.insertId, ...modelData });
    });
  };
  
  model.findById = (dataId, result) => {
    sql.query(`SELECT * FROM `+tableName+` WHERE id = ${dataId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found modelName: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found modelName with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  model.getAll = result => {
    sql.query("SELECT * FROM "+tableName+"", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("modelName: ", res);
      result(null, res);
    });
  };
  
  model.updateById = (id, modelData, result) => {
    let sqlStr = "UPDATE "+tableName+" SET ";
    var newModelData = [];
    var updateDef = [];
    for(i=0;i<def.length;i++){
        if(modelData[def[i]]){
            updateDef.push(def[i]);
        }
    }
    for(j=0;j<updateDef.length;j++){
        if(j==updateDef.length-1){
            sqlStr += updateDef[j] +" = ? "
        }else{
            sqlStr += updateDef[j] +" = ? , "
        }
        newModelData.push(modelData[updateDef[j]]);
    }
    newModelData.push(id);
    sqlStr += " WHERE id = ?"
    sql.query(
        sqlStr,
        newModelData,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found modelData with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated "+modelName+": ", { id: id, ...newModelData });
        result(null, { id: id, ...newModelData });
      }
    );
  };
  
  model.remove = (id, result) => {
    sql.query("DELETE FROM "+tableName+" WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found modelData with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted "+modelName+" with id: ", id);
      result(null, res);
    });
  };
  
  model.removeAll = result => {
    sql.query("DELETE FROM "+tableName+"", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} `+modelName);
      result(null, res);
    });
  };
}

module.exports = {make:makeModel};
