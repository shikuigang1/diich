package com.diich.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2017/5/2 0002.
 */
@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping("/")
    public String home(){
        return "index";
    }
}
