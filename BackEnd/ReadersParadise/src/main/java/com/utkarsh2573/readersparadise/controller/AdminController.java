package com.utkarsh2573.readersparadise.controller;

import com.utkarsh2573.readersparadise.RequestModels.AddBookRequest;
import com.utkarsh2573.readersparadise.service.AdminService;
import com.utkarsh2573.readersparadise.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/secure/add/book")
    public void addBook(@RequestHeader(value = "Authorization") String token,
                        @RequestBody AddBookRequest addBookRequest) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if (!admin.equals("admin") || admin == null)
            throw new Exception("Authorization Page Only!");

        adminService.postBook(addBookRequest);
    }
}
