package com.springboot.moviesapp;

import java.io.Serializable;

import javax.persistence.Embeddable;

import org.springframework.lang.NonNull;

@Embeddable
public class BookmarkIdentity implements Serializable{
	@NonNull
	private String email;
	@NonNull
	private String imdb_id;
	public BookmarkIdentity() {
		
	}
	public BookmarkIdentity(String email, String imdb_id) {
		this.email = email;
		this.imdb_id = imdb_id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
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
		if (!email.equals(that.email)) {
			return false;
		}
		return imdb_id.equals(that.imdb_id);
	}
	
}
