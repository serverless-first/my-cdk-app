import { App } from "@aws-cdk/core";
import { MyCdkAppStack } from "./my-cdk-app-stack";
import { MyCdkSOEStack } from "./my-cdk-soe-stack";

export class MyCdkApp extends App {
    constructor() {
        super();

        new MyCdkAppStack(this, "config-stack");
        new MyCdkSOEStack(this, "SOE-stack");
    }
}