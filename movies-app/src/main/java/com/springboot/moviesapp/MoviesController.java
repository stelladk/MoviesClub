package com.springboot.moviesapp;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
public class MoviesController {
	@Autowired
	private UserService userService;
	@Autowired
	private BookmarkService bookmarkService;

	@RequestMapping("/")
	public String viewHomePage() {
		return "index";
	}
	
	@RequestMapping(value = "/bookmarks", method = RequestMethod.GET)
	public String showBookmarks(Model model, HttpServletRequest request) {
//		String email = (String)request.getSession().getAttribute("email");
//		List<Bookmark> bookmarks = bookmarkService.selectByEmail(email);
		
		return "bookmarks";
	}
	
	@RequestMapping("/info")
	public String showMovieInfo() {
		return "info";
	}
}
