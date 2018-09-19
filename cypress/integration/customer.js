describe('Ototrack', function(){
	before(function(){
		cy.visit('127.0.0.1:3000/#/home')
	})
	it("Incorrect login", function(){
		cy.server()
		cy.route('POST', '/authenticate').as("authenticate")
		cy.get("input[type='email']").type("test@otonomis.co")
		cy.get("input[type='password']").type("secret")
		cy.contains('LOG IN').click()
		cy.wait('@authenticate', { timeout: 20000 })
		cy.wait(1100) //add this if you want to see "OK" is clicked
		cy.contains('Failed').should('be.visible')
		cy.contains("OK").click()	
	})
	it("Should login and redirect to /home", function(){
		cy.server()
		cy.route('POST', '/authenticate').as("authenticate")
		cy.get("input[type='email']").clear()
		cy.get("input[type='password']").clear()
		cy.get("input[type='email']").type("test@otonomis.com")
		cy.get("input[type='password']").type("secret")
		cy.contains('LOG IN').click()
		cy.wait('@authenticate', { timeout: 20000 })	
		cy.url().should('include','/home')
	})
	it("Home page should have vehicles", function(){
		cy.server()
		cy.route('/vehicles/10/1?paginate=1').as("fetchVehicles")
		cy.wait('@fetchVehicles', { timeout: 20000 })	
		cy.get('[data-cy=home-table]').find('tr').should('have.length.greaterThan',1)										
	})
	it("Should redirect to home", function(){
		cy.get('[data-cy=home]').click()
		cy.wait(1000)
		cy.url().should('include', '/home')	
	})
	it("Home Page Should Have Vehicles", function(){
		cy.server()
		cy.route('/vehicles/10/1?paginate=1').as("fetchVehicles")
		cy.wait('@fetchVehicles', { timeout: 30000 })	
		cy.get('[data-cy=home-table]').find('tr').should('have.length.greaterThan',1)										
	})
	it("Should redirect to customer", function(){
		cy.get('[data-cy=user]').click()
		cy.wait(1000)
		cy.url().should('include', '/customers')		
	})
	it("Customer should have customer table", function(){
		cy.server()
		cy.route('GET', '/customers/10/1?pagination=1').as("fetchCustomers")
		cy.wait('@fetchCustomers', { timeout : 50000 })
		cy.get('[data-cy=customer-table]').find('tr').should('have.length.greaterThan',1)
		cy.get('[data-cy=add-customer]').should('be.visible')
		cy.get('[data-cy=customer-action]').each(function ($el, index, $list) { 
			if(index==0){
				cy.wrap($el).click({force:true}).find("a[data-cy=edit-customer]")
												cy.get("button[data-cy='delete-customer']")

			
			}
		})
	})
	 it("Should redirect to customer create", function(){
		 cy.get('[data-cy=add-customer]').click()
		 cy.wait(1000)
		 cy.url().should('include','/customers/create')
		
	})
	// it("Should create customer", function(){
	// 	cy.server()
	// 	cy.route('POST','/customers').as("createCustomer")
	// })
	
	
	
	
 })


