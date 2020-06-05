package com.springboot.moviesapp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookmarkService {

	@Autowired
	private BookmarkRepository rep;
	
	public List<Bookmark> selectAll(){
		return rep.findAll();
	}
	
	public List<Bookmark> selectByEmail(String email){
		List<Bookmark> bookmarks =  rep.findAll();
		List<Bookmark> selectedBookmarks = new ArrayList<Bookmark>();
		for (Bookmark b: bookmarks ) {
			if (b.getBookmarkId().getAccount().getEmail().equals(email)) {
				selectedBookmarks.add(b);
			}
		}
		return selectedBookmarks;
	}
	
	public void save(Bookmark bookmark) {
		rep.save(bookmark);
	}
	
	public Bookmark get(BookmarkIdentity bookmarkId) {
		return rep.findById(bookmarkId).get();
	}
	
	public void remove(BookmarkIdentity bookmarkId) {
		rep.deleteById(bookmarkId);
	}

	public boolean check(BookmarkIdentity bookmarkId){
		List<Bookmark> bookmarks = selectByEmail(bookmarkId.getAccount().getEmail());
		for(Bookmark b: bookmarks){
			if(b.getBookmarkId().getImdb_id().equals(bookmarkId.getImdb_id())){
				return true;
			}
		}
		return false;
	}
}
