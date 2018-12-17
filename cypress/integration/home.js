
	it("Should get home page", function(){
		cy.url().should('include', '/home')
	})