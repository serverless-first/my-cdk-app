#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MyCdkAppStack } from '../lib/my-cdk-app-stack';

const app = new cdk.App();
new MyCdkAppStack(app, 'MyCdkAppStack');
