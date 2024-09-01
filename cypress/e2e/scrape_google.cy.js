describe("Google Search Scraping", () => {
  const SearchQuery = "Software Development Company in Greater Subury Area";

  it("Navigates to Google and searches for the query and store the results to text file. ", () => {
    cy.visit("https://www.google.com");
    cy.get('[name="q"]', { timeout: 15000 }).should("be.visible");
    cy.get('[name="q"]').type(`${SearchQuery}{enter}`);
    cy.wait(3000);

    cy.get(".S8ee5").click({ force: true });

    cy.get(".VkpGBb", { timeout: 15000 }).should("be.visible");

    cy.get(".VkpGBb").each(($el, index) => {
      const businessName = $el.find(".dbg0pd").text();

      const address = $el.find(".rllt__wrapped").text();

      const phoneNumber = $el.find(".rllt__details div").eq(2).text();

      // cy.get("div.g").each(($el, index) => {
      //   cy.wrap($el)
      //     .find("a")
      //     .invoke("text")
      //     .then((text) => {
      //       cy.log(`Result ${index + 1}: ${text}`);
      //     });
      // });

      // cy.wait(3000);

      // cy.get("div.g").each(($el, index) => {
      //   cy.wrap($el)
      //     .find("a")
      //     .invoke("text")
      //     .then((text) => {
      //       cy.writeFile(
      //         "cypress/search_results.txt",
      //         `Results ${index + 1}: ${text}\n`,
      //         {
      //           flag: "a",
      //         }
      //       );
      //     });
      cy.log(
        `Business ${
          index + 1
        }: ${businessName}, Address: ${address}, Phone: ${phoneNumber}`
      );
      cy.writeFile(
        "cypress/google_directory_results.txt",
        `Business ${
          index + 1
        }: ${businessName}, Address: ${address}, Phone: ${phoneNumber}\n`,
        { flag: "a" }
      );
    });
  });
});
