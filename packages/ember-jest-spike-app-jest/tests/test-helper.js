import Application from "ember-jest-spike-app-jest/app";
import config from "ember-jest-spike-app-jest/config/environment";
import { setApplication } from "@ember/test-helpers";

setApplication(Application.create(config.APP));
