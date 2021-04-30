# Node.js Rest APIs with Express & MySQL custom model
参考config下的template填写数据库连接信息
在models下的modelList中添加自己的模型就可以用了

```
const Models = [
    {
        name: "ORG",
        table: "ORG",
        title:"集团组织",
        def:[
            "title","code","level"
        ]
    }
];
module.exports =  Models;


```

请求范例：
```
var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:3000/ORG',
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
其他请求参考 routes/modelRoutes.js

## Project setup
```
npm install
```

### Run
```
node server.js
```
