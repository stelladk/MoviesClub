package com.springboot.moviesapp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	@Id 
	@Column (name = "email")
	private String email;
	@Column (name = "password")
	private String password;
	public User() {
	}
	
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
