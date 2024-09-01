describe("Google Search Scraping", () => {
  const SearchQuery = "Software Development Company in Greater Subury Area";

  beforeEach(() => {
    cy.visit("https://www.google.com");
  });

  it("Navigates to Google and searches for a query ", () => {
    cy.get('[name="q"]').should("be.visible");
    cy.get('[name="q"]').type(`${SearchQuery}{enter}`);
    cy.wait(3000);

    cy.get("div.g").each(($el, index) => {
      cy.wrap($el)
        .find("a")
        .invoke("text")
        .then((text) => {
          cy.log(`Result ${index + 1}: ${text}`);
        });
    });
  });

  it("Stores search results in a file", () => {
    cy.get('[name="q]').type(`${SearchQuery}{enter}`);

    cy.wait(3000);

    cy.get("div.g").each(($el, index) => {
      cy.wrap($el)
        .find("a")
        .invoke("text")
        .then((text) => {
          cy.writeFile(
            "cypress/search_results.txt",
            `Results ${index + 1}: ${text}\n`,
            {
              flag: "a",
            }
          );
        });
    });
  });
});
