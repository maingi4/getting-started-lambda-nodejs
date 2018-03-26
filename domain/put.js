'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid'),
  dynamoClient = new AWS.DynamoDB.DocumentClient(); 
  
module.exports.domainput = (event, context, callback) => {
  var id = uuid.v1();
  var body = JSON.parse(event.body);
  var params = {
		Item : {
			"Id": id,
      "Name": body.name,
      "Desc": body.desc
		},
		TableName : process.env.dynamoTableName
	};
	dynamoClient.put(params, function(err, data){
    var response;
		if (err){
      response = getErrorResponse(event, err);
    } else{
      response = getSuccessResponse(id, event);
    }
  
    callback(null, response);
  });
};

var getSuccessResponse = function (id, input){
  console.log("Created domain with id: " + id)
  var response = {
    statusCode: 200,
    body: JSON.stringify({
      location: "/domains/get/" + id,
      input: input
    })
  };

  return response;
}

var getErrorResponse = function (input, err){
  console.log({
    input: input,
    err: err
  });
  var response = {
    statusCode: 500,
    body: JSON.stringify({
      message: err,
      input: input
    })
  };

  return response;
}
