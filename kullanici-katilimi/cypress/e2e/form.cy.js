describe("Form Kontrolü", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Girilen metin istenilen adı içermelidir", () => {
    const expectedName = "eda";
    const nameInput = cy.get("[data-cy=name-input]");
    nameInput.type("eda");
    nameInput.should("have.value", expectedName);
  });

  it("Girilen email istenilen adresi içermelidir", () => {
    const expectedEmail = "eda.isik95@hotmail.com";
    const emailInput = cy.get("[data-cy=email-input]");
    emailInput.type("eda.isik95@hotmail.com");
    emailInput.should("have.value", expectedEmail);
  });

  it("Girilen şifre doğru mu?", () => {
    const expectedPassword = "edaisikkk";
    const passwordInput = cy.get("[data-cy=password-input]");
    passwordInput.type("edaisikkk");
    passwordInput.should("have.value", expectedPassword);
  });

  it("Checkbox işaretlenmeli.", () => {
    cy.get("[data-cy=terms-checkbox]").check().should("be.checked");
  });

  it("Form verileri gönderilebilmelidir", () => {
    cy.get("[data-cy=name-input]").type("eda");
    cy.get("[data-cy=surname-input]").type("ışık");
    cy.get("[data-cy=email-input]").type("eda.isik95@hotmail.com");
    cy.get("[data-cy=password-input]").type("edaisikkk");
    cy.get("[data-cy=terms-checkbox]").check();
    cy.get("[data-cy=submit-button]").should("not.be.disabled").click();
    cy.get("[data-cy=teamList]").should("be.visible");
  });

  it("Form verileri gönderilemez", () => {
    cy.get("[data-cy=name-input]").type("eda");
    cy.get("[data-cy=email-input]").type("eda.isik95@hotmail.com");
    cy.get("[data-cy=password-input]").type("edaisikkk");
    cy.get("[data-cy=terms-checkbox]").check();
    cy.get("[data-cy=submit-button]").should("be.disabled");
  });
});
