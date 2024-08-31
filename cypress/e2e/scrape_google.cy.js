describe("Google Search Scraping", () => {
  const SearchQuery = "Software Development Company in Greater Subury Area";

  beforeEach(() => {
    cy.visit("https://www.google.com");
  });

  it("Navigates to Google", () => {
    cy.visit("https://www.google.com");
  });

  it("Click on the search bar and type the query", () => {
    cy.visit("https://www.google.com");
    cy.slowDown(300);

    //wait for 3 seconds
    cy.wait(3000);

    //click on the search bar and type and click on the search button
    const SearchQuery = "Software Development Company in Greater Subury Area";
    cy.get('[name="q"]').type(`${SearchQuery}{enter}`);

    //delaying to stimulate the human-like behavior
    cy.wait(3000);

    cy.get("div.g").each(($el, index, $list) => {
      cy.wrap($el)
        .find("a")
        .invoke("text")
        .then((text) => {
          cy.log(`Result ${index + 1}: ${text}`);
        });
    });

    it("Stores search results in a file", () => {
      cy.get("div.g").each(($el, index, $list) => {
        cy.wrap($el)
          .find("a")
          .invoke("text")
          .then((text) => {
            cy.writeFile(
              "search_results.txt",
              `Result ${index + 1}: ${text}\n`,
              {
                flag: "a",
              }
            );
          });
      });
    });
    //delaying to stimulate the human-like behavior
    cy.wait(3000);

    //click on the more places button

    cy.contains("More places").click({ multiple: true });
    cy.wait(3000);
  });
});
