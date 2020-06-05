package com.springboot.moviesapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ResponseController {
	@Autowired
	private AccountService accountService;
	@Autowired
	private BookmarkService bookmarkService;
	
	@PostMapping("/login")
	@ResponseBody
	public ResponseEntity<?> getStats(@RequestBody Account account, Errors errors){
		AjaxResponse result = new AjaxResponse();
		if (errors.hasErrors()) {
			result.setMessage(errors.getAllErrors().stream().map(x->x.getDefaultMessage()).collect(Collectors.joining(",")));
			return ResponseEntity.badRequest().body(result);
		}
//		System.out.println(account.getPassword());
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

	@PostMapping("/saveb")
	@ResponseBody
	public ResponseEntity<?> saveb(@RequestBody Bookmark bookmark, Errors errors){
		AjaxResponse result = new AjaxResponse();
		if (errors.hasErrors()) {
			result.setMessage(errors.getAllErrors().stream().map(x->x.getDefaultMessage()).collect(Collectors.joining(",")));
			return ResponseEntity.badRequest().body(result);
		}
		System.out.println(bookmark);
		System.out.println(bookmark.getBookmarkId());
		System.out.println(bookmark.getBookmarkId().getEmail());
		System.out.println(bookmark.getBookmarkId().getImdb_id());
		bookmarkService.save(bookmark);
		result.setMessage("success");
		return ResponseEntity.ok(result);
	}

	@PostMapping("/deleteb")
	@ResponseBody
	public ResponseEntity<?> deleteb(@RequestBody Bookmark bookmark, Errors errors){
		AjaxResponse result = new AjaxResponse();
		if (errors.hasErrors()) {
			result.setMessage(errors.getAllErrors().stream().map(x->x.getDefaultMessage()).collect(Collectors.joining(",")));
			return ResponseEntity.badRequest().body(result);
		}
		bookmarkService.remove(bookmark.getBookmarkId());
		result.setMessage("success");
		return ResponseEntity.ok(result);
	}

	@PostMapping("/bookmarks")
	@ResponseBody
	public ResponseEntity<?> bookmarks(@RequestBody String email, Errors errors){
		AjaxResponse result = new AjaxResponse();
		if (errors.hasErrors()) {
			result.setMessage(errors.getAllErrors().stream().map(x->x.getDefaultMessage()).collect(Collectors.joining(",")));
			return ResponseEntity.badRequest().body(result);
		}
		List<Bookmark> bookmarks = bookmarkService.selectByEmail(email);
		if (bookmarks!=null) {
			if(!bookmarks.isEmpty()){
				result.setMessage("success");
				result.setBookmarks(bookmarks);
				return ResponseEntity.ok(result);
			}else{
				result.setMessage("empty");
			}
		}else {
			result.setMessage("fail");
		}
		return ResponseEntity.ok(result);
	}
}
