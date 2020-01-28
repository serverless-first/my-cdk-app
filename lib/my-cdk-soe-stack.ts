import { Stack, App } from "@aws-cdk/core";
import {
  GraphQLApi,
  FieldLogLevel,
  MappingTemplate
} from "@aws-cdk/aws-appsync";
import { Table, BillingMode, AttributeType } from "@aws-cdk/aws-dynamodb";

export class MyCdkSOEStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    const api = new GraphQLApi(this, "Api", {
      name: "customer-api",
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL
      },
      schemaDefinitionFile: "./schema/schema.graphql"
    });

    const customerTable = new Table(this, "CustomerTable", {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      }
    });

    const customerDS = api.addDynamoDbDataSource(
      "Customer",
      "The customer data source",
      customerTable
    );
    customerDS.createResolver({
      fieldName: "getCustomers",
      typeName: "Query",
      requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList()
    });

    customerDS.createResolver({
        fieldName: "getCustomer",
        typeName: "Query",
        requestMappingTemplate: MappingTemplate.dynamoDbGetItem("id", "id"),
        responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });

    customerDS.createResolver({
        fieldName: "saveCustomer",
        typeName: "Mutation",
        requestMappingTemplate: MappingTemplate.dynamoDbPutItem("id", "customer", "id"),
        responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });
    customerDS.createResolver({
        fieldName: "addCustomer",
        typeName: "Mutation",
        requestMappingTemplate: MappingTemplate.dynamoDbPutItem("id", "customer"),
        responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });
    customerDS.createResolver({
        fieldName: "removeCustomer",
        typeName: "Mutation",
        requestMappingTemplate: MappingTemplate.dynamoDbDeleteItem("id", "id"),
        responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });
  }
}
