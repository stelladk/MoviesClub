package com.springboot.moviesapp;

import java.io.Serializable;

import javax.persistence.*;

import org.springframework.lang.NonNull;

@Embeddable
public class BookmarkIdentity implements Serializable{
	@MapsId("email")
	@OneToOne()
	@JoinColumn(name = "email", referencedColumnName = "email")
	private Account account;
	@NonNull
	private String imdb_id;
	public BookmarkIdentity() {
		
	}
	public BookmarkIdentity(Account account, String imdb_id) {
		this.account = account;
		this.imdb_id = imdb_id;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public String getImdb_id() {
		return imdb_id;
	}
	public void setImdb_id(String imdb_id) {
		this.imdb_id = imdb_id;
	}
	@Override
	public boolean equals(Object o) {
		if (this==o)return true;
		if (o==null || getClass() != o.getClass())return false;
		
		BookmarkIdentity that = (BookmarkIdentity) o;
		if (!account.getEmail().equals(that.account.getEmail())) {
			return false;
		}
		return imdb_id.equals(that.imdb_id);
	}


	
}
