describe('Ototrack', function(){
	before(function(){
		cy.visit('127.0.0.1:3000/#/home')
	})
	it("Should reload page", function(){
		cy.reload()
	})
	it("Should get login page", function(){
		cy.url().should('include', '/login')
	})

	/* empty email and password check */
	it("Should click sign up without email and password", function(){
		cy.get('[data-cy = "login_sign_in"]').click()
	})

	it("Should show empty email error", function(){
		cy.get('[data-cy = "login_empty_email"]').contains('Please enter your email')
		cy.get('[data-cy = login_email]').should('have.class', 'input-error')
	})

	it("Should show empty password error", function(){
		cy.get('[data-cy = "login_empty_password"]').contains('Please enter your password')
		cy.get('[data-cy = login_password]').should('have.class', 'input-error')
	})

	/* invalid email format but password filled  and not click sign in*/
	it("Should type invalid email", function(){
		cy.get('[data-cy = login_email_label ]').click()
		cy.get('[data-cy = login_email]').type("web@otrack")
	})

	it("Should show invalid email error", function(){
		cy.get('[data-cy = "login_invalid_email"]').contains('Invalid email format')
		cy.get('[data-cy = login_email]').should('have.class', 'input-error')
	})
	it("Should type login password", function(){
		cy.get('[data-cy = login_password_label ]').click()
		cy.get('[data-cy = login_password]').type("Web123!@")
	})

	/* invalid email format but password filled  and click sign in*/

	it("Should show invalid email error", function(){
		cy.get('[data-cy = "login_invalid_email"]').contains('Invalid email format')
		cy.get('[data-cy = login_email]').should('have.class', 'input-error')
	}) // for only invalid format when not clicked

	it("Should click Sign In with password filled with invalid email", function(){
		cy.get('[data-cy = "login_sign_in"]').click()
	})

	it("Should show invalid email error", function(){
		cy.get('[data-cy = "login_invalid_email"]').contains('Invalid email format')
		cy.get('[data-cy = login_email]').should('have.class', 'input-error')
	}) // for invalid format even when clicked

	it("Should set password input  to red color", function(){
		cy.get('[data-cy = login_password]').should('have.class','input-error')	
	})

	it("Should show message of incorrect email password combination", function(){
		cy.get('[data-cy = login_authentication_error]').contains('Your email or password doesn\'t match any account')
	})


	 /* valid email but password empty and click sign in*/
	it("Should type valid email", function(){
		cy.get('[data-cy = login_email_label ]').click()
		cy.get('[data-cy = login_email]').type(".xyz")
		cy.get('[data-cy = "login_invalid_email"]').should('not.exist')
	})

	it("Should click Sign In with valid email but empty password", function(){
		cy.get('[data-cy = login_password]').clear()
		cy.get('[data-cy = "login_sign_in"]').click()
	})

	it("Should show empty password error but not email error", function(){
		cy.get('[data-cy = "login_empty_password"]').contains('Please enter your password')
		cy.get('[data-cy = login_password]').should('have.class', 'input-error')
		cy.get('[data-cy = login_email]').should('not.have.class', 'input-error')
	})

	/* fill password but email empty and click sign in */
	
	it("Should type login password", function(){
		cy.get('[data-cy = login_password_label ]').click()
		cy.get('[data-cy = login_password]').type("Web123!@")
	})

	it("Should click Sign In with password filled but empty email", function(){
		cy.get('[data-cy = login_email]').clear()
		cy.get('[data-cy = "login_sign_in"]').click()
	})


	it("Should show empty email error but not password error", function(){
		cy.get('[data-cy = "login_empty_email"]').contains('Please enter your email')
		cy.get('[data-cy = login_email]').should('have.class', 'input-error')
		cy.get('[data-cy = login_password]').should('not.have.class', 'input-error')
	})

	/* valid  but not existing email format with password filled and click sign in */
	it("Should type valid but not existing email", function(){
		cy.get('[data-cy = login_email_label ]').click()
		cy.get('[data-cy = login_email]').type("web@otrack.xy")
	})

	it("Should click Sign In with password filled with non existing email", function(){
		cy.server()
		cy.route('POST','/authenticate').as("authenticate")
		cy.get('[data-cy = "login_sign_in"]').click()
		cy.wait('@authenticate')
		cy.url().should('include','/login')	
		cy.get('[data-cy = "login_sign_in"]').click()
	})

	it("Should set email input to red color", function(){
		cy.get('[data-cy = "login_invalid_email"]').should('not.exist')
		cy.get('[data-cy = login_email]').should('have.class', 'input-error')
	})

	it("Should set password input  to red color", function(){
		cy.get('[data-cy = login_password]').should('have.class','input-error')	
	})

	it("Should show message of incorrect email password combination", function(){
		cy.get('[data-cy = login_authentication_error]').contains('Your email or password doesn\'t match any account')
	})

	/* valid  and existing email but with wrong password and click sign in */
	it("Should type valid and existing email", function(){
		cy.get('[data-cy = login_email_label ]').click()
		cy.get('[data-cy = login_email]').type("z")
	})

	it("Should click Sign In with existing email but wrong password", function(){
		cy.server()
		cy.route('POST','/authenticate').as("authenticate")
		cy.get('[data-cy = "login_sign_in"]').click()
		cy.wait('@authenticate')
		cy.url().should('include','/login')	
	})

	it("Should set email input to red color", function(){
		cy.get('[data-cy = "login_invalid_email"]').should('not.exist')
		cy.get('[data-cy = login_email]').should('have.class', 'input-error')
	})

	it("Should set password input to red color", function(){
		cy.get('[data-cy = login_password]').should('have.class','input-error')	
	})

	it("Should show message of incorrect email password combination", function(){
		cy.get('[data-cy = login_authentication_error]').contains('Your email or password doesn\'t match any account')
	})

	/* valid and existing email with right password and click Sign In*/
	it("Should type login password", function(){
		cy.get('[data-cy = login_password_label ]').click()
		cy.get('[data-cy = login_password]').type("#")
	})
	
	it("Should click Sign In with existing email with right password and redirect to home page", function(){
		cy.server()
		cy.route('POST','/authenticate').as("authenticate")
		cy.get('[data-cy = "login_sign_in"]').click()
		cy.wait('@authenticate', {timeout:25000})
		cy.url().should('include','/home')		
	})
	require("./home.js")
	


	
})