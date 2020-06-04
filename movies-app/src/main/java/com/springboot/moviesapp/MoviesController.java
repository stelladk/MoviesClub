package com.springboot.moviesapp;

import org.springframework.web.bind.annotation.ModelAttribute;
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
	private AccountService accountService;
	@Autowired
	private BookmarkService bookmarkService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String viewHomePage(Model model) {
		Account account = new Account();
		model.addAttribute("account", account);
		return "index";
	}
	
	@RequestMapping(value = "/bookmarks", method = RequestMethod.GET)
	public String showBookmarks(Model model, HttpServletRequest request) {
		String email = (String)request.getSession().getAttribute("email");
//		List<Bookmark> bookmarks = bookmarkService.selectByEmail(email);
		
		return "bookmarks";
	}
	
	@RequestMapping(value = "/info", method = RequestMethod.GET)
	public String showMovieInfo() {
		return "info";
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public String signup(@ModelAttribute("account") Account account) {
		accountService.save(account);
		return "redirect:/";
	}
}
