'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid'),
  dynamoClient = new AWS.DynamoDB.DocumentClient(); 
  
module.exports.domainget = (event, context, callback) => {
  var params = {
		Key: {
			"Id": event.queryStringParameters.id,
		},
		TableName : process.env.dynamoTableName
	};
	dynamoClient.get(params, function(err, data){
    var response;
		if (err){
      response = getErrorResponse(event, err);
    } else{
      response = getSuccessResponse(data);
    }
  
    callback(null, response);
  });
};

var getSuccessResponse = function (data){
  console.log("Retrieved domain with id: " + data.id)
  var response = {
    statusCode: 200,
    body: JSON.stringify(data)
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
