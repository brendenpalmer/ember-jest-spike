const { precompile } = require("ember-source/dist/ember-template-compiler");

const Component = require("@glimmer/component");
const SimpleDOM = require("simple-dom");
const { JSDOM } = require("jsdom");
const FastBoot = require("fastboot");
const path = require("path");

console.log(precompile(`<WelcomePage/>`));

const fastBoot = new FastBoot({
  distPath: path.resolve(__dirname, "..", "..", "dist"),
});

class FastBootInfo {
  constructor() {
    this.deferredPromise = Promise.resolve();

    this.request = {
      method: "GET",
      body: "",
      cookies: {},
      headers: {},
      queryParams: {},
      path: "/",
      protocol: "http",
      host: function () {
        return "localhost";
      },
    };
  }

  deferRendering(promise) {
    this.deferredPromise = Promise.all([this.deferredPromise, promise]);
  }

  /*
   * Registers this FastBootInfo instance in the registry of an Ember
   * ApplicationInstance. It is configured to be injected into the FastBoot
   * service, ensuring it is available inside instance initializers.
   */
  register(instance) {
    instance.register("info:-fastboot", this, { instantiate: false });
    instance.inject("service:fastboot", "_fastbootInfo", "info:-fastboot");
  }
}

const fastbootInfo = new FastBootInfo();

function buildBootOptions(shouldRender) {
  let doc = new JSDOM("<div></div>");
  let rootElement = doc.body;
  let _renderMode = process.env.EXPERIMENTAL_RENDER_MODE_SERIALIZE
    ? "serialize"
    : undefined;

  return {
    isBrowser: false,
    document: doc.window.document,
    rootElement,
    shouldRender,
    _renderMode,
  };
}

describe("Integration | Component | welcome page", function () {
  it("it links to version for release version", async function () {
    let bootOptions = buildBootOptions(true);
    let shouldBuildApp = fastBoot._app._applicationInstance === undefined;

    let { app, isSandboxPreBuilt } = shouldBuildApp
      ? await fastBoot._app.getNewApplicationInstance()
      : fastBoot._app.getAppInstanceInfo(fastBoot._app._applicationInstance);

    await app.boot();

    let instance = await app.buildInstance();

    fastbootInfo.register(instance);

    await instance.boot(bootOptions);

    console.log(Component);

    debugger;
    instance.register(
      "component:custom-thing",
      class extends Component.default {
        template = precompile(`<WelcomePage/>`);
      }
    );

    const component = instance.lookup("component:story-mode");

    debugger;

    console.log(fastBoot._app, isSandboxPreBuilt);
  });
});
