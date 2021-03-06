package com.niit.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.niit.SkillMapBackend.model.ErrorClass;
import com.niit.SkillMapBackend.model.UserDetail;
import com.niit.SkillMapBackend.service.UserService;


@CrossOrigin(origins = {"http://localhost:4200"})
//@CrossOrigin(origins= {"http://localhost:9876"})
@RestController
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private SessionFactory sessionFactory;

	public UserController() {
		System.out.println("UserController bean is created");
	}

	@RequestMapping("/")
	public String message() {

		return "Server is running ";
	}

	@RequestMapping(value = "/registerUser", method = RequestMethod.POST)
	public ResponseEntity<?> registerUser(@RequestBody UserDetail user) {

		System.out.println("registerUser in UserController" + user.getSkill());
		if (!userService.isEmailUnique(user.getEmailid())) {
			ErrorClass error = new ErrorClass(1, "Email already exists...please enter different email");
			return new ResponseEntity<ErrorClass>(error, HttpStatus.CONFLICT);
		}
		try {
			userService.registerCustomer(user);
		} catch (Exception e) {
			ErrorClass error = new ErrorClass(2, "some required fields are empty..." + e.getMessage());
			return new ResponseEntity<ErrorClass>(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<UserDetail>(user, HttpStatus.OK);
	}



	@RequestMapping(value = "/getuser/{eid}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(HttpSession session,@PathVariable("eid") int eid) {
		
		if (eid <= 0) {
			ErrorClass error = new ErrorClass(5, "Unauthorised access...");
			return new ResponseEntity<ErrorClass>(error, HttpStatus.UNAUTHORIZED);
		}
		UserDetail user = userService.getUser(eid);
		
		return new ResponseEntity<UserDetail>(user, HttpStatus.OK);
	}

	@RequestMapping(value = "/allusers", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUsers(HttpSession session) {
		System.out.println("Getting all users");
		List<UserDetail> users = userService.listUsers();
		return new ResponseEntity<List<UserDetail>>(users, HttpStatus.OK);
	}
	
	@RequestMapping(value="/deleteuser/{eid}",method=RequestMethod.DELETE)
	 public ResponseEntity<?> deleteUser(@PathVariable("eid") int eid)
		{
			UserDetail user=userService.getUser(eid);
			if (user == null) {
				ErrorClass error = new ErrorClass(4, "User not found....");
				return new ResponseEntity<ErrorClass>(error, HttpStatus.NOT_FOUND);
			}
			else
			{
			userService.deleteUser(eid);
			return new ResponseEntity<UserDetail>(user, HttpStatus.OK);
			}
			
		}
	
	@RequestMapping(value = "/updateuser", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUser(@RequestBody UserDetail user, HttpSession session) {
		System.out.println(user.getEmpid());
		if (user.getEmpid()<=0) { // not logged in ,loginId returns null.
			ErrorClass error = new ErrorClass(5, "Unauthorised access...");
			return new ResponseEntity<ErrorClass>(error, HttpStatus.UNAUTHORIZED);
		}
		try {
			userService.updateUser(user);
			return new ResponseEntity<UserDetail>(user, HttpStatus.OK);
		} catch (Exception e) {
			ErrorClass error = new ErrorClass(5, "Unable to update user details...." + e.getMessage());
			return new ResponseEntity<ErrorClass>(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
