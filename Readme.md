# Install
Run the following commands:

```
npm init #follow the guide to create package.json

npm install serverless -g

# create the template for the domain service
serverless create --template aws-nodejs --path domain

```

# Deploy

Run the following commands:

```
cd domain

#will create the get & put lambda functions, api gateway & dynamo db table to store domains
serverless deploy --region us-east-1 --stage dev
```

# Try the service
Note the API gateway endpoint created in the `deploy` step above, it should be present in the output. In case you don't have the output anymore, go to AWS console and get the API URL from the API Gateway part of the console.

Example:

Create a domain

Request:
```
PUT https://2w31hwi1f6.execute-api.us-east-1.amazonaws.com/dev/domains/put HTTP/1.1
User-Agent: Fiddler
Host: 2w31hwi1f6.execute-api.us-east-1.amazonaws.com
Content-Length: 57

{
  "name": "a domain",
  "desc": "some description"
}
```

Response:

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 1571
Connection: keep-alive
Date: Mon, 26 Mar 2018 09:10:22 GMT
x-amzn-RequestId: 839271de-30d5-11e8-99e5-75b6d1ec532c
x-amz-apigw-id: EWHX0Fq3IAMFSHg=
X-Amzn-Trace-Id: sampled=0;root=1-5ab8b8fe-29ea1c26fe1c5797c9d33d25
X-Cache: Miss from cloudfront
Via: 1.1 622984f77dccd480b1b655dc4625dd24.cloudfront.net (CloudFront)
X-Amz-Cf-Id: -YALvHLfr2WlmRHcHjakoQiApkVSO_jilEoXZYzjjpz64t45SqcwSQ==

{"location":"/domains/get/83990110-30d5-11e8-b030-3585da8b8c33","input":{"resource":"/domains/put","path":"/domains/put","httpMethod":"PUT","headers":{"CloudFront-Forwarded-Proto":"https","CloudFront-Is-Desktop-Viewer":"true","CloudFront-Is-Mobile-Viewer":"false","CloudFront-Is-SmartTV-Viewer":"false","CloudFront-Is-Tablet-Viewer":"false","CloudFront-Viewer-Country":"IN","Host":"2w31hwi1f6.execute-api.us-east-1.amazonaws.com","User-Agent":"Fiddler","Via":"1.1 622984f77dccd480b1b655dc4625dd24.cloudfront.net (CloudFront)","X-Amz-Cf-Id":"tH9mAyUJ7zUwvZ8M0UdjNe-DeKeRt7FQC4bRfGVZ5vWPYv-MKcCpNA==","X-Amzn-Trace-Id":"Root=1-5ab8b8fe-8604b2b42c3fbe7678040f00","X-Forwarded-For":"114.143.135.82, 54.182.245.48","X-Forwarded-Port":"443","X-Forwarded-Proto":"https"},"queryStringParameters":null,"pathParameters":null,"stageVariables":null,"requestContext":{"resourceId":"wrhq1m","resourcePath":"/domains/put","httpMethod":"PUT","extendedRequestId":"EWHX0Fq3IAMFSHg=","requestTime":"26/Mar/2018:09:10:22 +0000","path":"/dev/domains/put","accountId":"522390200088","protocol":"HTTP/1.1","stage":"dev","requestTimeEpoch":1522055422838,"requestId":"839271de-30d5-11e8-99e5-75b6d1ec532c","identity":{"cognitoIdentityPoolId":null,"accountId":null,"cognitoIdentityId":null,"caller":null,"sourceIp":"114.143.135.82","accessKey":null,"cognitoAuthenticationType":null,"cognitoAuthenticationProvider":null,"userArn":null,"userAgent":"Fiddler","user":null},"apiId":"2w31hwi1f6"},"body":"{\r\n  \"name\": \"a domain\",\r\n  \"desc\": \"some description\"\r\n}","isBase64Encoded":false}}
```

Get the created domain:

Request:
```
GET https://2w31hwi1f6.execute-api.us-east-1.amazonaws.com/dev/domains/get?id=83990110-30d5-11e8-b030-3585da8b8c33 HTTP/1.1
User-Agent: Fiddler
Host: 2w31hwi1f6.execute-api.us-east-1.amazonaws.com
Content-Length: 0
```

Response:
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 98
Connection: keep-alive
Date: Mon, 26 Mar 2018 09:13:11 GMT
x-amzn-RequestId: e80db607-30d5-11e8-8d33-a506aa878829
x-amz-apigw-id: EWHyKF1zIAMFQeQ=
X-Amzn-Trace-Id: sampled=0;root=1-5ab8b9a7-2dcc0c49e6716d5701fe8cea
X-Cache: Miss from cloudfront
Via: 1.1 622984f77dccd480b1b655dc4625dd24.cloudfront.net (CloudFront)
X-Amz-Cf-Id: 3uxvpW74GzyJG4BGgUCrgyh1pc_lEobzl5zfAjku2kPS7PWYX24Ftw==

{"Item":{"Desc":"some description","Id":"83990110-30d5-11e8-b030-3585da8b8c33","Name":"a domain"}}
```

# Remove deployment

Run the following:

```
# assumption: start from root folder
cd domain

serverless remove --region us-east-1 --stage dev
```