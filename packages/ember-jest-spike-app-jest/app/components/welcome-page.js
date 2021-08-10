import { getOwner } from "@ember/application";
import { VERSION } from "@ember/version";
import { computed, get } from "@ember/object";
import Component from "@ember/component";
import { inject as service } from "@ember/service";
import layout from "../templates/components/welcome-page";

export default Component.extend({
  layout,

  fastboot: service("fastboot"),

  isCurrent: computed(function () {
    let displayCurrent = false;
    let version = VERSION;
    let patch = version.split(".")[2];

    if (version === "master") {
      displayCurrent = true;
    } else if (patch.match("alpha")) {
      displayCurrent = true;
    } else if (patch.match("beta")) {
      displayCurrent = true;
    }

    return displayCurrent;
  }),

  isModuleUnification: computed(function () {
    const config = getOwner(this).resolveRegistration("config:environment");

    return config && config.isModuleUnification;
  }),

  rootURL: computed(function () {
    let config = getOwner(this).factoryFor("config:environment");

    if (config) {
      return config.class.rootURL;
    } else {
      return "/";
    }
  }),

  emberVersion: computed("isCurrent", function () {
    let isCurrent = get(this, "isCurrent");

    if (isCurrent) {
      return "current";
    } else {
      let [major, minor] = VERSION.split(".");
      return `${major}.${minor}.0`;
    }
  }),
});
