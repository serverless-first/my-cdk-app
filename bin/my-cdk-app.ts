#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MyCdkAppStack } from '../lib/my-cdk-app-stack';
import { MyCdkApp } from '../lib/my-cdk-app';

const app = new MyCdkApp();
//new MyCdkAppStack(app, 'MyCdkAppStack');
