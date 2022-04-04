//
// Credential Management Specs
// Filename: cred_mgmt_spec.js
//
// Author: Ben N
//

describe("Middleware session mgmt", () => {
  let cs = null;

  let user_1 = [
    "cna_short_name",
    "cna_username",
    "api_key",
  ];

  let user_2 = [
    "cna_short_name_2",
    "cna_username_2",
    "api_key",
  ];

  let user_3 = [
    "cna_short_name_2",
    "cna_username_2",
    "api_key",
  ];

  beforeEach(() => {
    cs = new CveServices("http://localhost:8080/api", "/__src__/sw.js");
  });

  it("registers new user", async () => {
    await expectAsync(
      cs.login(...user_1)
    ).toBeResolvedTo('ok');
  });

  it("logs out session", async () => {
    await expectAsync(
      cs.login(...user_1)
    ).toBeResolvedTo('ok');

    await expectAsync(
      cs.logout()
    ).toBeResolvedTo(true);
  });

  it("rejects API methods without session", async () => {
    return expectAsync(cs.getCveIds()).toBeRejected();
  });

  it("rejects API methods after logout", async () => {
    await expectAsync(
      cs.login(...user_1)
    ).toBeResolvedTo('ok');

    await expectAsync(
      cs.logout()
    ).toBeResolvedTo(true);
  });

  it("does not logout empty session", async () => {
    await expectAsync(
      cs.logout()
    ).toBeResolvedTo(false);
  });

  it("switches accounts", async () => {
    await expectAsync(
      cs.login(user_1)
    ).toBeResolvedTo('ok');

    // Convention 1: call login multiple times
    await expectAsync(
      cs.login(user_2)
    ).toBeResolvedTo('ok');

    // Convention 2: logout then login
    await expectAsync(
      cs.logout()
    ).toBeResolvedTo(true);
  });
});
