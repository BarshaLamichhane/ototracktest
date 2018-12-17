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
		cy.wait('@authenticate', { timeout: 25000 })
		cy.wait(1100) //add this if you want to see "OK" is clicked
		cy.contains('Failed').should('be.visible')
		cy.contains("OK").click()	
	})

	it("Should login and redirect to /home", function(){
		cy.server()
		cy.route('POST', '/authenticate').as("authenticate")
		cy.route('GET','/vehicles/10/1?paginate=1').as("fetchVehicles")
		cy.get("input[type='email']").clear()
		cy.get("input[type='password']").clear()
		cy.get("input[type='email']").type("test@otonomis.com")
		cy.get("input[type='password']").type("secret")
		cy.contains('LOG IN').click()
		cy.wait('@authenticate', { timeout: 25000 })	
		cy.wait('@fetchVehicles', { timeout: 25000 })
	})

	// it("Should confirm vehicles are fetched", function(){
	// 	cy.url().should('include','/home')
	// 	cy.get('[data-cy=home-table]').find('tr').should('have.length.greaterThan',1)
	// })

	// it("Should redirect to customer", function(){
	// 	cy.server()
	// 	cy.route('GET', '/customers/10/1?pagination=1').as("fetchCustomers")
	// 	cy.get('[data-cy=user]').click()
	// 	cy.wait('@fetchCustomers', { timeout : 25000 })	
	// })

	// it("Should confirm if customers are fetched", function(){
	// 	cy.url().should('include', '/customers')	
	// 	cy.get('[data-cy=customer-table]').find('tr').should('have.length.greaterThan',1)
	// 	cy.get('[data-cy=add-customer]').should('be.visible')
	// 	cy.get('[data-cy=customer-action]').each(function ($el, index, $list) { 
	// 		if(index==0){
	// 			cy.wrap($el).click({force:true}).find("a[data-cy=edit-customer]")
	// 			cy.get("button[data-cy='delete-customer']")
	// 		}
	// 	})
	// })

	// it("Should fetch organization to create customer", function(){
	// 	cy.server()
	// 	cy.route('/organizations?paginate=0').as("fetchOrganizations")
	// 	cy.route('GET','/customers/**').as("fetchOperationAllowed")
	// 	cy.get('[data-cy=add-customer]').click()
	// 	cy.wait(['@fetchOrganizations', '@fetchOperationAllowed'], { timeout: 25000 })
		
	// })

	// it("Should redirect to customer create", function(){
	// 	cy.url().should('include', '/customers/create')	
	// 	cy.get('[data-cy=create-customer]').should('be.visible')	
	// 	cy.get('[data-cy=update-customer]').should('not.be.visible')
	// })

	// it("Should type customer name", function(){
	// 	cy.get("input[data-cy='customer-name']").type("Hari Bangas").contains( "Hari Bangas").should('have.length.lessThan', 30)
	// })
	
	// it("Should type customer email", function(){
	// 	cy.get("input[data-cy='customer-email']").type("hariacharaya@gmail.com").contains("hariacharaya@gmail.com").should('have.length.lessThan', 50)
	// })

	// it("Should type customer password", function(){
	// 	cy.get("input[data-cy='customer-password']").type("hariH123$").contains("hariH123$").should('have.length.lessThan', 30)
	// })

	// it("Should create customer", function(){
	// 		cy.server()
	// 		cy.route('POST','/customers').as("createCustomer")
	// 		cy.get('[data-cy=create-customer]').click()
	// 		cy.wait('@createCustomer', {timeout:25000})
	// 		cy.wait(1500)// to notice ok is clicked
	// 		cy.contains('Created')
	// 		cy.contains('OK').click()
	// 		cy.url().should('include','/customers')	
	// })

	// it("Should fetch organization to create customer", function(){
	// 	cy.server()
	// 	cy.route('/organizations?paginate=0').as("fetchOrganizations")
	// 	cy.route('GET','/customers/**').as("fetchOperationAllowed")
	// 	cy.get('[data-cy=add-customer]').click()
	// 	cy.wait(['@fetchOrganizations', '@fetchOperationAllowed'], { timeout: 25000 })
		
	// })

	// it("Should redirect to customer create", function(){
	// 	cy.url().should('include', '/customers/create')	
	// 	cy.get('[data-cy=create-customer]').should('be.visible')	
	// 	cy.get('[data-cy=update-customer]').should('not.be.visible')
	// })
	
	// it("Should select organization", function(){
	// 	cy.get("select[data-cy='customer-organization']").should('have.length.greaterThan',0)
	// 	 												.select('Otonomis PVT. LTD').should('have.value', '5b6d6dff69f1b822a38416da')
	// })//fails if Organization is not fetched

	// it("Should type customer contact_no", function(){
	// 	cy.get("input[data-cy='customer-contact_no']").type("9862135788").contains("9862135788").should('have.length.lessThan', 11)
	// })

	// it("Should type customer sms_credit", function(){
	// 	cy.get("input[data-cy='customer-sms_credit']").type("123").contains("123").should('have.length.lessThan', 4)
	// })

	// it("Should type customer position", function(){
	// 	cy.get("input[data-cy='customer-position']").type("Web Developer").contains("Web Developer").should('have.length.lessThan', 30)
	// })
	
	// it("Should select/check operations_allowed", function(){
	// 	cy.get("input[data-cy='customer-operations_allowed']").should('have.length.lessThan',12).each(function($el, index, $list){
	// 		if(index==0 || index==8 || index==2) {
	// 			cy.wrap($el).check().should('have.checked','true')

	// 		}
	// 	})	
	// })

	// it("Should select/check reports_allowed", function(){
	// 	cy.get("input[data-cy='customer-reports_allowed']").should('have.length.lessThan',6).each(function($el, index, $list){
	// 		if(index==0 || index==5 || index==2) {
	// 			cy.wrap($el).check().should('have.checked','true')
	// 		}
	// 	})	
	// })

	// it("Should not create customer as name email and password fields are empty which are required", function(){
	// 	cy.server()
	// 	cy.route('POST','/customers').as("createCustomer")
	// 	cy.get('[data-cy=create-customer]').click()
	// 	cy.wait('@createCustomer', {timeout:25000})
	// 	cy.wait(1500)// to notice ok is clicked
	// 	cy.contains('Failed')
	// 	cy.contains('OK').click()
	// 	cy.url().should('include','/customers/create')	
	// })

	// it("Should type customer name", function(){
	// 	cy.get("input[data-cy='customer-name']").type("Kamala").contains( "Kamala ").should('have.length.lessThan', 30)
	// })
	
	// it("Should type customer email", function(){
	// 	cy.get("input[data-cy='customer-email']").type("kamalacharaya@gmail.com").contains("kamalacharaya@gmail.com").should('have.length.lessThan', 50)
	// })

	// it("Should type customer password", function(){
	// 	cy.get("input[data-cy='customer-password']").type("kamalaH123$").contains("kamalaH123$").should('have.length.lessThan', 30)
	// })

	// it("Should type contact_no", function(){
	// 	cy.get("input[data-cy='customer-contact_no']").clear().type("123").contains("123").should('have.length.lessThan', 11)
	// })

	// it("Should type customer sms_credit", function(){
	// 	cy.get("input[data-cy='customer-sms_credit']").clear().type("1wee23").contains("1wee23").should('have.length.lessThan', 10)
	// })

	// it("Should not create customer as contact_no is invalid and sms_credit is not a number", function(){
	// 	cy.server()
	// 	cy.route('POST','/customers').as("createCustomer")
	// 	cy.get('[data-cy=create-customer]').click()
	// 	cy.wait('@createCustomer', {timeout:25000})
	// 	cy.wait(1500)// to notice ok is clicked
	// 	cy.contains('Failed')
	// 	cy.contains('OK').click()
	// 	cy.url().should('include','/customers/create')	
	// })
	
	// it("Should type contact_no", function(){
	// 	cy.get("input[data-cy='customer-contact_no']").clear().type("9862135788").contains("9862135788").should('have.length.lessThan', 11)
	// })

	// it("Should type customer sms_credit", function(){
	// 	cy.get("input[data-cy='customer-sms_credit']").clear().type("1000").contains("1000").should('have.length.lessThan', 10)
	// })

	// it("Should create customer", function(){
	// 	cy.server()
	// 	cy.route('POST','/customers').as("createCustomer")
	// 	cy.get('[data-cy=create-customer]').click()
	// 	cy.wait('@createCustomer', {timeout:25000})
	// 	cy.wait(1500)// to notice ok is clicked
	// 	cy.contains('Created')
	// 	cy.contains('OK').click()
	// 	cy.url().should('include','/customers')	
	// })

	// it("Should not delete customer", function(){
	// 	cy.get('[data-cy=customer-action]').each(function ($el, index, $list) { 
	// 		if(index==5){
	// 			cy.wrap($el).click({force:true}).find("button[data-cy='delete-customer']").click({force:true})//find("a[data-cy=edit-customer]")
	// 			//cy.get("button[data-cy='delete-customer']").click({force:true})
	// 			cy.wait(1500)
	// 			cy.contains("No").click()
	// 		}
	// 	})
	// })

	// it("Should delete customer", function(){
	// 	cy.server()
	//  	cy.route( 'DELETE', '/customers/**').as("deleteCustomer")
	// 	cy.get('[data-cy=customer-action]').each(function ($el, index, $list) { 
	// 		if(index==5){
	// 			cy.wrap($el).click({force:true}).find("button[data-cy='delete-customer']").click({force:true})//find("a[data-cy=edit-customer]")
	// 			//cy.get("button[data-cy='delete-customer']").click({force:true})
	// 			cy.wait(1500)
	// 			cy.contains("Yes").click()
	// 			cy.wait('@deleteCustomer', { timout : 25000 })
	// 			cy.wait(1500)
	// 			cy.contains('OK').click()
	// 			cy.url().should('include','/customers')	
	// 		}
	// 	})
	// })

	// it("Should delete customer", function(){
	// 	cy.server()
	//  	cy.route( 'DELETE', '/customers/**').as("deleteCustomer")
	// 	cy.get('[data-cy=customer-action]').each(function ($el, index, $list) { 
	// 		if(index==5){
	// 			cy.wrap($el).click({force:true}).find("button[data-cy='delete-customer']").click({force:true})//find("a[data-cy=edit-customer]")
	// 			//cy.get("button[data-cy='delete-customer']").click({force:true})
	// 			cy.wait(1500)
	// 			cy.contains("Yes").click()
	// 			cy.wait('@deleteCustomer', { timout : 25000 })
	// 			cy.wait(1500)
	// 			cy.contains('OK').click()
	// 			cy.url().should('include','/customers')	
	// 		}
	// 	})
	// })

	// it("Should redirect to update Customer", function(){
	// 	cy.server()
	// 	cy.route('GET','/organizations?paginate=0').as("fetchOrganizations")
	// 	cy.route('GET','/customers/5b6d6e0169f1b822a38416db').as("fetchOperationAllowed")//id through which it is logged in
	// 	cy.route('GET','/customers/5b8f5d3eedcbfe1e371c5eb0').as("fetchCustomerInformation")//id of which to be updated
	// 	cy.get('[data-cy=customer-action]').each(function ($el, index, $list) { 
	// 		if(index==4){
	// 			cy.wrap($el).click({force:true}).find("a[data-cy=edit-customer]").click({force:true})//find("a[data-cy=edit-customer]")
	// 			//cy.get("button[data-cy='delete-customer']").click({force:true})
	// 			cy.wait(['@fetchOrganizations','@fetchOperationAllowed','@fetchCustomerInformation'], { timout : 30000 })
	// 		}
	// 	})
	// })

	// it("Should confirm customer is redirected to update customer", function(){
	// 	cy.get('[data-cy=create-customer]').should('not.be.visible')	
	// 	cy.get('[data-cy=update-customer]').should('be.visible')
	// })

	// it("Should type customer name", function(){
	// 	cy.get("input[data-cy='customer-name']").clear().type("Rinky Nayak").contains( "Rinky Kumari Nayak ").should('have.length.lessThan', 30)
	// })

	// it("Should update corresponding", function(){
	// 	cy.server()
	// 	cy.route('PUT','/customers/**').as("updateCustomer")
	// 	cy.get('[data-cy=update-customer]').click()
	// 	cy.wait('@updateCustomer',{ timout : 25000 })
	// 	cy.wait(1500)
	// 	cy.contains("Updated")
	// 	cy.contains("OK").click()
	// 	cy.url().should('include','/customers')
	// })

	
 })


