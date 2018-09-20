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
		cy.wait('@authenticate', { timeout: 30000 })
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
		cy.wait('@authenticate', { timeout: 25000 })	
		cy.url().should('include','/home')
	})
	it("Home page should have vehicles", function(){
		cy.server()
		cy.route('/vehicles/10/1?paginate=1').as("fetchVehicles")
		cy.wait('@fetchVehicles', { timeout: 25000 })
													
	})
	it("Should confirm Vehicles are fetched", function(){
		cy.get('[data-cy=home-table]').find('tr').should('have.length.greaterThan',1)	

	 }) 
	it("Should redirect to home", function(){
		cy.get('[data-cy=home]').click()
		cy.wait(1000)
		cy.url().should('include', '/home')	
	})

	it("Home page Should fetch Vehicles", function(){
		cy.server()
		cy.route('/vehicles/10/1?paginate=1').as("fetchVehicles")
		cy.wait('@fetchVehicles', { timeout: 25000 })											
	})

	it("Home page should have vehicle table", function(){
		cy.get('[data-cy=home-table]').find('tr').should('have.length.greaterThan',1)
	})

	it("Should redirect to customer", function(){
		cy.get('[data-cy=user]').click()
		cy.wait(1000)
		cy.url().should('include', '/customers')		
	})

	it("Should fetch Customer", function(){
		cy.server()
		cy.route('GET','/profile').as("fetchProfile")
		cy.route('GET', '/customers/10/1?pagination=1').as("fetchCustomers")
		cy.wait(['@fetchCustomers','@fetchProfile'], { timeout : 25000 })
	})

	it("Should confirm if customers are fetched", function(){
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
		cy.url().should('include', '/customers/create')	
		cy.get('[data-cy=create-customer]').should('be.visible')	
		cy.get('[data-cy=update-customer]').should('not.be.visible')
	})
	it("Should fetch organization to create customer", function(){
		cy.server()
		cy.route('/organizations?paginate=0').as("fetchOrganizations")
		cy.wait('@fetchOrganizations', { timeout: 25000 })			
	})
	it("Should fetch operation_allowed permitted to tick to that logged in customer", function(){
		cy.server()
		cy.route('GET','/customers/**').as("fetchOperationAllowed")
		cy.wait('@fetchOperationAllowed', { timeout: 25000 })
	})
	// it("Should fill customer attributes",function(){
				
		
		
	// 	// cy.get("input[data-cy='customer-position']").check().should('have.checked','true')
	// 	// cy.get("input[data-cy='customer-operation_allowed']")
	// 	// cy.get("input[data-cy='customer-reports_allowed']")
	// })

	it("Should type customer name", function(){
		cy.get("input[data-cy='customer-name']").type("Hari Bangas").contains( "Hari Bangas").should('have.length.lessThan', 30)
	})

	it("Should type customer email", function(){
		cy.get("input[data-cy='customer-email']").type("hariacharaya@gmail.com").contains("hariacharaya@gmail.com").should('have.length.lessThan', 50)
	})

	// it("Should type customer password", function(){
	// 	cy.get("input[data-cy='customer-password']").type("hariH123$").contains("hariH123$")

	// })

	it("Should select organization", function(){
		cy.get("select[data-cy='customer-organization']").should('have.length.greaterThan',0)
		 												.select('Otonomis PVT. LTD').should('have.value', '5b6d6dff69f1b822a38416da')
	})//fails if Organization is not fetched

	// it("Should type customer name", function(){
	// 	cy.get("input[data-cy='customer-contact_no']").type("9862135788").contains("9862135788")
	// })

	// it("Should type sms_credit", function(){
	// 	cy.get("input[data-cy='customer-sms_credit']").type("123").contains("123")
	// })
	
	it("Should select/check operations_allowed", function(){
		cy.get("input[data-cy='customer-operations_allowed']").should('have.length',11).each(function($el, index, $list){
			if(index==0){
				cy.warp($el).check().should('have.checked','true')

			}
			

		})
			//cy.wrap($list).should('have.length',11)
	})
	
	
	
	
	
 })


