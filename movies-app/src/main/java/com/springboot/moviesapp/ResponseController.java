package com.springboot.moviesapp;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResponseController {
	@Autowired
	private AccountService accountService;
	
	@PostMapping("/login")
	@ResponseBody
	public ResponseEntity<?> getStats(@RequestBody Account account, Errors errors){
		AjaxResponse result = new AjaxResponse();
		if (errors.hasErrors()) {
			result.setMessage(errors.getAllErrors().stream().map(x->x.getDefaultMessage()).collect(Collectors.joining(",")));
			return ResponseEntity.badRequest().body(result);
		}
		System.out.println(account.getPassword());
		Account found = accountService.get(account.getEmail());
		if (found!=null) {
			if (found.getPassword().equals(account.getPassword())) {
				result.setMessage("success");
				result.setAccount(account);
				return ResponseEntity.ok(result);
			}else {
				result.setMessage("wrgpass");
			}
		}else {
			result.setMessage("nouser");
		}
		return ResponseEntity.ok(result);
	}
}
