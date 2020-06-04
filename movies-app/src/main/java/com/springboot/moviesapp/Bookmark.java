package com.springboot.moviesapp;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "bookmark")
public class Bookmark {
	@EmbeddedId
	private BookmarkIdentity bookmarkId;
	public Bookmark() {
		
	}
	public Bookmark(BookmarkIdentity bookmarkId) {
		this.bookmarkId=bookmarkId;
	}
	public BookmarkIdentity getBookmarkId() {
		return bookmarkId;
	}
	public void setBookmarkId(BookmarkIdentity bookmarkId) {
		this.bookmarkId = bookmarkId;
	}
	
	@MapsId("email")
	@OneToOne()
	@JoinColumn(name = "email", referencedColumnName = "email")
	private Account account;
	
}
