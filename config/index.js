import objectPath from "object-path";
import _default from "./default.js";
import development from "./development.js";
import production from "./production.js";

class Config {
  constructor() {
    this.env = process.env.NODE_ENV || "development";
    this.config = null;
    switch (this.env.toLowerCase()) {
      case "development":
        this.config = objectPath(Object.assign(_default, development));
        break;
      case "production":
        this.config = objectPath(Object.assign(_default, production));
    }
  }

  get = (propName) => this.validateProp(this.config.get(propName), propName);

  validateProp = (prop, propName) => {
    if (prop === null || typeof prop === "undefined") {
      throw new Error(`Property ${propName} is not defined in configurations`);
    }
    return prop;
  };
}

export default new Config();
