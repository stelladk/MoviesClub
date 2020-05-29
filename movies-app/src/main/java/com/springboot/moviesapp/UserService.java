package com.springboot.moviesapp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	private UserRepository rep;
	
	public List<User> selectAll(){
		return rep.findAll();
	}
	
	public void save(User user) {
		rep.save(user);
	}
	public User get(String email) {
		return rep.findById(email).get();
	}
	public void remove(String email) {
		rep.deleteById(email);
	}

}
