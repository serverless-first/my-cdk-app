import * as cdk from '@aws-cdk/core';
import * as ssm from "@aws-cdk/aws-ssm";

export class MyCdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new ssm.StringParameter(this, "/mycdkapp/registry", {
      stringValue: "https://localhost:9080",
      description: "The registry for the APIs",
      parameterName: "/mycdkapp/registry",
      type: ssm.ParameterType.STRING
    })

  
  }
}
