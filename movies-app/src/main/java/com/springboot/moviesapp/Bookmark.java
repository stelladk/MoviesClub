package com.springboot.moviesapp;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;


@Entity
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
	
}
