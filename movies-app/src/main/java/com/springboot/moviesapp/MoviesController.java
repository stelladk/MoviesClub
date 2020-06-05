package com.springboot.moviesapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MoviesController {
	@Autowired
	private AccountService accountService;
	@Autowired
	private BookmarkService bookmarkService;

	@GetMapping(value = "/")
	public String viewHomePage(Model model) {
		Account account = new Account();
		model.addAttribute("account", account);
		return "index";
	}
	
	@GetMapping(value = "/bookmarks")
	public String showBookmarks(Model model) {
//		String email = (String)request.getSession().getAttribute("email");
//		List<Bookmark> bookmarks = bookmarkService.selectByEmail(email);
		
		return "bookmarks";
	}
	
	@GetMapping(value = "/info")
	public String showMovieInfo() {
		return "info";
	}
	
	@PostMapping(value = "/signup")
	public String signup(@ModelAttribute("account") Account account) {
		accountService.save(account);
		return "redirect:#";
	}

//	@GetMapping("/")
//	public ModelAndView home() {
//		ModelAndView model =  new ModelAndView();
//		Authentication auth = SecurityContextHolder
//		Account account = accountService.get(null);
//	}
	
	
}