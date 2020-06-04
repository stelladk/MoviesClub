package com.springboot.moviesapp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
	
	@Autowired
	private AccountRepository rep;
	
	public List<Account> selectAll(){
		return rep.findAll();
	}
	
	public void save(Account account) {
		rep.save(account);
	}
	public Account get(String email) {
		return rep.findById(email).get();
	}
	public void remove(String email) {
		rep.deleteById(email);
	}

}
