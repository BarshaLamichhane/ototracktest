describe('Ototrack', function(){
	before(function(){
		cy.visit('127.0.0.1:3000/#/home')
	})
	// it("Incorrect Login", function(){
	// 	cy.get("input[type='email']").type("test@otonomis.co")
	// 	cy.get("input[type='password']").type("secret")
	// 	cy.contains('LOG IN').click()
	// 	cy.contains('Failed')//.should('not.be.visible')
	// 	cy.contains("OK").click()
	// 	cy.url().should('not.include', '/home')
	// })
	it("Should Login and redirect to /home", function(){
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
	it("Home Page Should Have Vehicles", function(){
		cy.server()
		cy.route('/vehicles/10/1?paginate=1').as("fetchVehicles")
		cy.wait('@fetchVehicles', { timeout: 20000 })	
		cy.get('[data-cy=home-table]').find('tr').should('have.length.greaterThan',1)										
	})
	it("Should Redirect To Home", function(){
		cy.get('[data-cy=home]').click()
		cy.url().should('include', '/home')		

	})
	// it ("Should Redirect To Vehicles", function(){
	// 	cy.get('[data-cy=vehicle]').click()
 	// 	cy.url().should('include', '/vehicles')		
 	// })
	// it("Vehicle Page Should Display Vehicles", function(){
	// 	cy.server()
	// 	cy.route(  '/vehicles/10/1?paginate=1').as("fetchVehicles")
	// 	cy.wait('@fetchVehicles', { timeout : 30000 })
	// 	cy.get('[data-cy=vehicle-table]').find('tr').should('have.length.greaterThan',1)
	// 	cy.get('[data-cy=edit-vehicle ]').should('be.visible')
	// 	cy.get('[data-cy=delete-vehicle]').should('be.visible')
	// 	cy.get('[data-cy=add-vehicle]').should('be.visible')											
	// 	///cy.get('[data-cy=next-page]').should('not.have.class', 'disabled').should('be.visible')
	// 	//cy.get('[data-cy=next-page]').click()
	// })
	// it("Should redirect to create vehicle", function(){
	// 	cy.server()
	// 	cy.route('/customers?paginate=0').as("fetchCustomers") //needs customer and organization so is checked
	// 	cy.route('/organizations?paginate=0').as("fetchOrganizations")
	// 	//cy.route('/groups?paginate=0').as("fetchGroups")
	// 	cy.get('[data-cy=add-vehicle]').click()
	// 	cy.url().should('include', '/vehicles/create')
	// 	cy.wait(['@fetchCustomers', '@fetchOrganizations'], { timeout: 30000 })
	// 	cy.get('[data-cy=create-vehicle]').should('be.visible')	
	// 	cy.get('[data-cy=update-vehicle]').should('not.be.visible')	
	// 	cy.wait(3000)
		
	// })
	// it("Should fill vehicle with imed, plate_no, device_gsm_no, guarantee_deadline, guarantee_start_date, subscription_deadline but all other empty", function(){
	// 	cy.get("input[data-cy='plate_no']").type("Barsha6377")//plate_no, text, unique, required
	// 	cy.get("input[data-cy='imed']").type("34534565346546")//imed, text, unique, required
	// 	cy.get("input[data-cy='device_gsm_no']").type("14253667546456")//device_gsm_number,text,unique, require
	// 	//cy.get("input[data-cy='subscription_deadline']").type("{uparrow}")
	// 	cy.get("input[data-cy='subscription_deadline']")
	// 	//.type('2012-01-01T01:01')
	// 	 .click()
	// 	.then(input => {
	// 		input[0].dispatchEvent(new Event('input', { bubbles: false, scoped: true }))
	// 		input.val("2019-06-17T01:01")
	// 	})
	// 	.click()

		//subscription_deadline// required
		// cy.get("input[data-cy='guarantee_start_date']").click().then (input => {
		// 	cy.wait(5000)
		// 	input[0].dispatchEvent(new Event('input', { bubbles: true }))
		// 	input.val('2019-08-11T09:05:00')
		// }).click()//guarantee_start_date, text//required
		// cy.get("input[data-cy='guarantee_deadline']").click().then (input => {
		// 	cy.wait(5000)
		// 	input[0].dispatchEvent(new Event('input', { bubbles: true }))
		// 	input.val('2020-12-30T00:32:10.12')
		// }).click()//guarantee_deadline, text
			// cy.get("input[type='datetime-local']").type("2018-12-30T00:32:10.120Z")//guarantee_deadline, text//required
		 
	// })
	// it
	// it("Should create vehicle", function(){
	// 	cy.server()
	// 	cy.route('POST','/vehicles').as("postVehicles") //put here post 
	// 	cy.url().should('include', '/vehicles/create')
	// 	cy.get('[data-cy=create-vehicle]').click()
	// 	cy.wait('@postVehicles', { timeout: 20000 })
	// 	cy.contains("OK").click()
	// 	cy.wait(1500)
	// 	cy.url().should('include','/vehicles')
	// })
	// it("Should redirect to create vehicle", function(){
	// 	cy.server()
	// 	cy.route('/customers?paginate=0').as("fetchCustomers") //needs customer and organization so is checked
	// 	cy.route('/organizations?paginate=0').as("fetchOrganizations")
	// 	//cy.route('/groups?paginate=0').as("fetchGroups")
	// 	cy.get('[data-cy=add-vehicle]').click()
	// 	cy.url().should('include', '/vehicles/create')
	// 	cy.wait(['@fetchCustomers', '@fetchOrganizations'], { timeout: 20000 })
	// 	cy.get('[data-cy=create-vehicle]').should('be.visible')	
	// 	cy.get('[data-cy=update-vehicle]').should('not.be.visible')	
 	
	// })
	// it("Should fill vehicle with invalid entity", function(){
	// 	cy.get("input[data-cy='plate_no']").type("Barsha6377")//plate_no, text, unique, required
	// 	cy.get("input[data-cy='imed']").type("34534565346546")//imed, text, unique, required
	// 	cy.get("input[data-cy='device_gsm_no']").type("14253667546456")//device_gsm_number,text,unique, required
	// 	cy.get("input[data-cy='driver']").type("Bishal53")//driver, text
	// 	cy.get("input[data-cy='driver_scoring']").type(2)//driver_scoring, text	
	// 	cy.get('[data-cy=organization_vehicle]').should('not.have.length',0)
	// 											.select('Otonomis PVT. LTD').should('have.value', '5b6d6dff69f1b822a38416da')
																	
	// 	//cy.get('[data-cy=customerIdCreate]')//value=group._id, UI=group.name
	// 	cy.get('[data-cy=vehicle_customer_email]').should('not.have.length',0)
	// 										.select('test@otonomis.com').should('have.value','5b6d6e0169f1b822a38416db')//value=customer._id, UI=customer.email
	// 	cy.get("input[data-cy='reactivity_time']").type(10).contains(/^(\d+(\.\d+)?)*$/)//reactivity_time, number converted to text
	// 	cy.get("input[data-cy='standby_time']").type(4).contains(/^(\d+(\.\d+)?)*$/)//standby_time, number converted to text
	// 	cy.get("input[data-cy='engine_blockage']").uncheck().should('not.have.checked','true')//engine_blockage, checkbox
	// 	cy.get("input[data-cy='engine_status']").check().should('have.checked','true')//engine_status, checkbox
	// 	cy.get("input[data-cy='latitude']").type(27.707042616054544).contains(/^(\d+(\.\d+)?)*$/)//latitude, number converted to text
	// 	cy.get("input[data-cy='longitude']").type(85.31824648102737).contains(/^(\d+(\.\d+)?)*$/)//longitude, number converted to text
	// 	cy.get("input[data-cy='speed_limit']").type(53).contains(/^(\d+(\.\d+)?)*$/)//speed_limit, number converted to text
	// 	cy.get("input[data-cy='start_km']").type(35).contains(/^(\d+(\.\d+)?)*$/)//start_km, number converted to text
	// 	cy.get("input[data-cy='types_of_notification']").type("email")//types_of_notification, text like (email, sms, and so on)
	// 	cy.get("input[data-cy='types_of_service']").type("Customer Research Technician")    //types_of_service, text
	// 	cy.get("input[data-cy='subscription_deadline']").click()
	// 	.then(input => {
	// 		input[0].dispatchEvent(new Event('input', { bubbles: true }))
	// 		input.val('2019-03-13T13:00:00')
	// 	}).click()//subscription_deadline
	// 	cy.get("input[data-cy='guarantee_start_date']").click().then (input => {
	// 		input[0].dispatchEvent(new Event('input', { bubbles: true }))
	// 		input.val('2019-08-11T09:05:00')
	// 	}).click()//guarantee_start_date, text
	// 	cy.get("input[data-cy='guarantee_deadline']").click().then (input => {
	// 		input[0].dispatchEvent(new Event('input', { bubbles: true }))
	// 		input.val('2020-12-30T00:32:10.12')
	// 	}).click()//guarantee_deadline, text
	// 		// cy.get("input[type='datetime-local']").type("2018-12-30T00:32:10.120Z")//guarantee_deadline, text
	// 	cy.wait(1500)
	
	// 	})
	// 	it("Should not create vehicle", function(){
	// 		cy.server()
	// 		cy.route('POST','/vehicles').as("postVehicles") //put here post 
	// 		cy.url().should('include', '/vehicles/create')
	// 		cy.get('[data-cy=create-vehicle]').click()
	// 		cy.wait('@postVehicles',{ timeout: 20000 })
	// 		cy.wait(1500)
	// 		cy.contains("OK").click()
	// 		cy.url().should('include','/vehicles/create')
	// 	})
	// 	it("Should Fill Vehicle With plate_no or imed or device_gsm empty or subscription_deadline or guarantee_dealine or guarantee_start_date or all empty", function(){
	// 		cy.get("input[data-cy='plate_no']").clear()//plate_no, text, unique, required
	// 		cy.get("input[data-cy='imed']").clear()//imed, text, unique, required
	// 		 cy.get("input[data-cy='device_gsm_no']").type("67")//device_gsm_number,text,unique, required
	// 		 cy.wait(1500)
			
	// 	})
	// 	 it("Should not create vehicle", function(){
	// 		cy.server()
	// 		cy.route('POST','/vehicles').as("postVehicles") //put here post 
	// 		cy.url().should('include', '/vehicles/create')
	// 		cy.get('[data-cy=create-vehicle]').click()
	// 		cy.wait('@postVehicles', { timeout: 20000 })
	// 		cy.wait(1500)
	// 		cy.contains("OK").click()
	// 		cy.url().should('include','/vehicles/create')
	// 	})
		
	
	// it("Should fill vehicle with valid entity", function(){
	// cy.get("input[data-cy='plate_no']").type("Barsha6777")//plate_no, text, unique, required
	// cy.get("input[data-cy='imed']").type("5049869248140")//imed, text, unique, required
	// cy.wait(1500)
	// })
	// it("Should create vehicle", function(){
	// 	cy.server()
	// 	cy.route('POST','/vehicles').as("postVehicles")
	// 	cy.url().should('include', '/vehicles/create')
	// 	cy.get('[data-cy=create-vehicle]').click()
	// 	cy.wait('@postVehicles', { timeout: 20000 })
	// 	cy.wait(1500)
	// 	cy.contains("OK").click()
	// 	cy.url().should('includes','/vehicles')
	// })
	
 	// it("Should click for pagination Vehicle", function(){
 	// 	//cy.get('[data-cy=vehicle]').click()
 	// 	//cy.url().should('include','/vehicles')
	// 	cy.get('[data-cy=vehicle-pages]').each(function ($el, index, $list) { 
	// 		if(index == 6) //clicks page no 7
	// 		{
	// 			cy.wrap($el).click()
	// 			cy.wait(5000)
	// 		}
	// 	})
	
	//  })
	// it ("Should Not Delete Selected Vehicle", function(){
		
	// 	cy.get('[data-cy=delete-vehicle]').each(function($el, index, $list){
	// 		if(index==7)
	// 		{
	// 			cy.wait(2000)
	// 			cy.wrap($el).click()
	// 			//cy.wait(4000)
	// 		}
	// 	})
	// 	cy.wait(1500)
	// 	cy.contains("No").click()	
	//  })
	// it ("Should Delete Selected Vehicle", function(){
	// 	cy.server()
	// 	cy.route( 'DELETE', '/vehicles/**').as("deleteVehicle")
	// 	cy.get('[data-cy=delete-vehicle]').each(function($el, index, $list){
	// 		if(index==7)
	// 		{
	// 			cy.wait(2000)
	// 			cy.wrap($el).click()
	// 			cy.wait(1500)
	// 			cy.contains("Yes").click()
	// 			cy.wait(1500)
	// 			cy.wait('@deleteVehicle', { timout : 20000 })
	// 			cy.wait(1500)
	// 			cy.contains("OK").click()	
	// 			cy.url().should('includes','/vehicles')
	// 		}
	// 	})
	// })
	// it ("Should Delete Selected Vehicle", function(){
	// 	cy.server()
	// 	cy.route( 'DELETE', '/vehicles/**').as("deleteVehicle")
	// 	cy.get('[data-cy=delete-vehicle]').each(function($el, index, $list){
	// 		if(index==7)
	// 		{
	// 			cy.wait(2000)
	// 			cy.wrap($el).click()
	// 			cy.wait(1500)
	// 			cy.contains("Yes").click()
	// 			cy.wait(1500)
	// 			cy.wait('@deleteVehicle', { timout : 20000 })
	// 			cy.wait(1500)
	// 			cy.contains("OK").click()
	// 			cy.url().should('includes','/vehicles')
	// 		}
	// 	})
		
	// })
	// it("Should click for pagination Vehicle", function(){
	// 	//cy.get('[data-cy=vehicle]').click()
	// 	//cy.url().should('include','/vehicles')
	//    cy.get('[data-cy=vehicle-pages]').each(function ($el, index, $list) { 
	// 	   if(index == 1) //clicks page no 7
	// 	   {
	// 		   cy.wrap($el).click()
	// 		   cy.wait(5000)
	// 	   }
	//    })
   
	// })
	// it("Should Redirect To Update Vehicle", function(){
	// 	cy.server()
	// 	cy.route('GET','/customers?paginate=0').as("fetchCustomers") //needs customer and organization so is checked
	// 	cy.route('GET','/organizations?paginate=0').as("fetchOrganizations")
	// 	//cy.route('/groups?paginate=0').as("fetchGroups")	
		
	// 	cy.get('[data-cy=edit-vehicle]').each(function($el, index, $list){
	// 		if(index==0)
	// 		{
	// 			//scy.wait(3000)
	// 			cy.wrap($el).click()
	// 			cy.wait(4000)
	// 		}
	// 	})
	// 	//cy.url().should('contain', '/vehicles/update/**')
	// 	cy.wait(['@fetchCustomers', '@fetchOrganizations'], { timeout: 20000 })
	// 	cy.get('[data-cy=update-vehicle]').should('be.visible')
	// 	cy.get('[data-cy=create-vehicle]').should('not.be.visible')
	
	// })
	// it("Should update vehicle", function(){
	// 	cy.server()
	// 	cy.route('PUT','/vehicles/**').as("updateVehicles")
	// 	//cy.url().should('include', '/vehicles/create')
	// 	cy.get('[data-cy=update-vehicle]').click()
	// 	cy.wait('@updateVehicles', { timeout: 20000 })
	// 	//cy.wait(5000)
	// 	cy.contains("OK").click()
	// 	cy.url().should('includes','/vehicles')
	// })
	
 })


