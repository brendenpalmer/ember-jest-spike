import { hbs } from "ember-cli-htmlbars";

debugger;

describe("Integration | Component | welcome page", function (hooks) {
  beforeEach(async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:4200/tests");

    await jestPuppeteer.debug();
  }, 100000000);

  it("it links to version for release version", async function () {
    const {
      render,
      setupRenderingContext,
      teardownRenderingContext,
    } = require("@ember/test-helpers");

    setupRenderingContext();

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    Ember.VERSION = "3.1.5";

    debugger;

    await render(hbs`<WelcomePage/>`);

    let [emberMajor, emberMinor] = Ember.VERSION.split(".");
    let [welcomeMajor, welcomeMinor, welcomePatch] = this.element
      .querySelector("[data-ember-version]")
      .dataset.emberVersion.split(".");

    assert.equal(
      emberMajor,
      welcomeMajor,
      "Major segment of version should match."
    );
    assert.equal(
      emberMinor,
      welcomeMinor,
      "Minor segment of version should match."
    );
    assert.equal("0", welcomePatch, "Patch segment of version should be 0.");

    teardownRenderingContext();
  });

  // it('it links to "/current" for alpha versions', async function (assert) {
  //   // Set the version property
  //   Ember.VERSION = "2.15.0-alpha.1";

  //   await render(hbs`<WelcomePage/>`);

  //   let versionText = this.element.querySelector("[data-ember-version]").dataset
  //     .emberVersion;

  //   assert.equal(
  //     versionText,
  //     "current",
  //     "Version text should be set to 'current' when an alpha version is used."
  //   );
  // });

  // it('it links to "/current" for beta versions', async function (assert) {
  //   // Set the version property
  //   Ember.VERSION = "2.15.0-beta.1";

  //   await render(hbs`<WelcomePage/>`);

  //   let versionText = this.element.querySelector("[data-ember-version]").dataset
  //     .emberVersion;

  //   assert.equal(
  //     versionText,
  //     "current",
  //     "Version text should be set to 'current' when a beta version is used."
  //   );
  // });

  // it('it links to "/current" for master', async function (assert) {
  //   // Set the version property
  //   Ember.VERSION = "master";

  //   await render(hbs`<WelcomePage/>`);

  //   let versionText = this.element.querySelector("[data-ember-version]").dataset
  //     .emberVersion;

  //   assert.equal(
  //     versionText,
  //     "current",
  //     "Version text should be set to 'current' when master is used."
  //   );
  // });
});
