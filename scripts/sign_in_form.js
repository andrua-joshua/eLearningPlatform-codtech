$(document).ready(() => {

	// swap login and signup panels
	$('#signUp').click(() => { console.log('Upclicked');
		$('#container').addClass('right-panel-active');
	});

	$('#signIn').click(() => { console.log('InClicked');
		$('#container').removeClass('right-panel-active');
	});

	const signupButton = $('#signUpBtn');
	const loginButton = $('#signInBtn');

	// ********** ---- SIGN UP ---- CODE ---- BLOCK ---- ***********
	$(':button').on('keypress', (e) => {
			e.preventDefault();
	});

	document.body.addEventListener('keypress', (e) => {
		if (e.keyCode === 13) {
			console.log('enterClicked');
			if ($('#container').hasClass('right-panel-active')) {
				signupButton.click();
			}
			else {
				loginButton.click();
			}
			
		}
	});

	signupButton.click((event) => {
		event.preventDefault(); console.log('signupClicked');

			// fetching signup data
			const firstName = $('#first_name');
			const lastName = $('#last_name');
			const Email = $('#email');
			const setPassword = $('#set_password');
			const confirmPassword = $('#confirm_password');
			var first_name = firstName.val();
			var last_name = lastName.val();
			var email = Email.val();
			var set_password = setPassword.val();
			var confirm_password = confirmPassword.val();
			const signupForm = $('#signupForm');
			const signupMessage = $('#myMsg');

			// ------- ClientSide Validation ---------
			if (first_name=='' && last_name=='' && email=='' && set_password=='' && confirm_password=='') {
				signupMessage.css('color', 'red');
				signupMessage.html('Fill in required input fields!');
				setTimeout(() => {
					signupMessage.fadeOut(1000);
				}, 4000);
			}
			else {
				var validated = false;
				//validate first name
				function validateFirstName(fname) {
					var errorMsg = $('#firstNameMsg');

					if (fname=='') {
						firstName.addClass('error');
						errorMsg.html('Enter First Name');
					}
					else if (fname.length < 2) {
						firstName.addClass('error');
						errorMsg.html('Enter Valid Name');
					}
					else {
						validated = true;
					}

					if (errorMsg.html()!='') {
						setTimeout(() => {
							firstName.removeClass('error');
							errorMsg.fadeOut(1000);
						}, 4000);
					}
					if (validated == true) {
						return fname;
					}
				}
				// validate last name
				function validateLastName(lname) {
					var errorMsg = $('#lastNameMsg');

					if (lname=='') {
						lastName.addClass('error');
						errorMsg.html('Enter Last Name');
					}
					else if (lname < 2) {
						lastName.addClass('error');
						errorMsg.html('Enter Valid Name');
					}
					else {
						validated = true;
					}

					if (errorMsg.html()!='') {
						setTimeout(() => {
							lastName.removeClass('error');
							errorMsg.fadeOut(1000);
						}, 4000);
					}
					if (validated == true) {
						return lname;
					}
				}
				//validate email
				function validateEmail(email) {
					var errorMsg = $('#emailMsg');
					var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

					if (email=='') {
						Email.addClass('error');
						errorMsg.html('Enter Your Email');
					}
					else if (!email.match(emailRegex)) {
						Email.addClass('error');
						errorMsg.html('Invalid Email');
					}
					else {
						validated = true;
					}
					if (errorMsg.html()!='') {
						setTimeout(() => {
							Email.removeClass('error');
							errorMsg.fadeOut(1000);
						}, 4000);
					}
					if (validated == true) {
						return email;
					}
				}
				// validate password
				function validateSetPassword(setPwd) {
					var errorMsg = $('#setPasswordMsg');
					var pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8, 50}$/;

					if (setPwd=='') {
						setPassword.addClass('error');
						errorMsg.html('Set a Password');
					}
					else if (setPwd.length < 8) {
						setPassword.addClass('error');
						errorMsg.html("Weak Password! Atleast 8 characters");
					}
					else {
						validated = true;
					}

					if (setPassword.hasClass('error')) {
						setTimeout(() => {
							setPassword.removeClass('error');
							errorMsg.fadeOut(1000);
						}, 4000);
					}
					if (validated == true) {
						return setPwd;
					}
				}
				// validate confirm_password
				function validateConfirmPassword(confirmPwd) {
					var errorMsg = $('#setPasswordMsg');

					if (confirmPwd=='' && vsetPassword=='') {
						confirmPassword.addClass('error');
					}
					if (vsetPassword!='') {
						if (confirmPwd=='') {
							confirmPassword.addClass('error');
							errorMsg.html('Confirm your Password');
						}
						else {
							validated = true;
						}
					}
					
					if (confirmPassword.hasClass('error')) {
						setTimeout(() => {
							confirmPassword.removeClass('error');
							errorMsg.fadeOut(1000);
						}, 4000);
					}
					if (validated == true) {
						return confirmPwd;
					}
				}

				var vfirstName = validateFirstName(first_name);
				var vlastName = validateLastName(last_name);
				var vemail = validateEmail(email);
				var vsetPassword = validateSetPassword(set_password);
				var vconfirmPassword = validateConfirmPassword(confirm_password);

				if (vfirstName!='' && vlastName!='' && vemail!='' && vsetPassword!='' && vconfirmPassword!='') {
					if (vsetPassword !== vconfirmPassword) {
						setPassword.addClass('error');
						confirmPassword.addClass('error');
						signupMessage.css('color', 'red');
						signupMessage.html("Passwords don't match");

						setTimeout(() => {
							setPassword.removeClass('error');
							confirmPassword.removeClass('error');
							signupMessage.fadeOut(1000);
						}, 4000);
					} 
					else {
						$.ajax({
							url: "../php/signup.php",
							method: "POST",
							datatype: "text",
							data: {signup: 'signup', firstName: first_name, lastName: last_name, email: email, set_password: set_password, confirm_password: confirm_password},
							beforesend: () => {
				
							},
							success: (resp) => {
								if (resp === "signupSuccess") {
									signupForm.trigger('reset');
									signupMessage.css('color', 'green');
									signupMessage.fadeIn().html("Thank You for Signing Up");
				
									if (signupMessage.html()!=='') {
										setTimeout(() => {
											signupMessage.fadeOut(1000);
											$('#student_name').html(first_name);
											$('#container').removeClass('right-panel-active');
										}, 2500);
									}
								}
								else {
									signupMessage.css('color', 'red');
									signupMessage.html(resp);
				
									if (signupMessage.html()!=='') {
										setTimeout(() => {
											signupMessage.fadeOut(1000);
										}, 4000);
									}
								}
							},
							complete: () => {
				
							}
						});
					}
				}
			}
	});

	// ********** ---- LOGIN ---- CODE ---- BLOCK ---- ***********
	loginButton.click(() => {
		console.log('loginClicked');

		var login_email = $('#login_email').val();
		var login_password = $('#login_password').val();
		const loginMessage = $('#loginMessage');
		const loginForm = $('#loginForm');

		if (login_email!='' && login_password!='') {
			$.ajax({
				url: "../php/login.php",
				method: "GET",
				datatype: "text",
				data: {login: "login", login_email: login_email, login_password: login_password},
				success: (resp) => {
					if (resp === "success") {
						window.location = "../html/home.html";
						loginForm.trigger('reset');
					}
					else {
						loginMessage.css('color', 'red');
						loginMessage.html('Invalid Email or Password');
	
						if (loginMessage.html()!=='') {
							setTimeout(() => {
								loginMessage.fadeOut(1000);
							}, 4000);
						}
					}
				} 
			});
		}
		else {
			loginMessage.css('color', 'red');
			loginMessage.html('Enter required fields');

			setTimeout(() => {
				loginMessage.fadeOut(1000);
			}, 4000);
		}
	});

});
