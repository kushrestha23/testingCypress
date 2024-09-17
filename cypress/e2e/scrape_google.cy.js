describe("Google Search Scraping", () => {
  const SearchQuery = "Software Development Company in Greater Subury Area";
  const resultsFilePath = "google_directory_results.txt";

  /**
   * Safely extracts text from a given element and selector
   * @param {Cypress.Object} element - The cypress-wrapped DOM element.
   * @param {String} selector - The CSS selector
   * @return {String} The extracted text.
   */
  const safeExtractText = (element, selector) => {
    return element.find(selector).text() || "";
  };

  /**
   *Logs and writes search results to a file.
    @param {Number} index - The index of the business.
    @param {String} businessName - The name of the business. 
    @param {String} address - The address of the business.
    @param {String} phoneNumber - The phone number of the business.
  */

  const longAndWriteResults = (index, businessName, address, phoneNumber) => {
    const result = `Business ${index}: ${businessName}, Address: ${address}, Phone: ${phoneNumber}`;
    cy.log(result);
    cy.writeFile(resultsFilePath, `${result}\n`, { flag: "a" });
  };

  before(() => {
    cy.writeFile(resultsFilePath, "", { flag: "w" });
  });

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

      longAndWriteResults(index + 1, businessName, address, phoneNumber);
    });
  });
});
