package com.utkarsh2573.readersparadise.controller;

import com.utkarsh2573.readersparadise.RequestModels.AddBookRequest;
import com.utkarsh2573.readersparadise.service.AdminService;
import com.utkarsh2573.readersparadise.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PutMapping("/secure/increase/book/quantity")
    public void increaseBookQuantity(@RequestHeader(value = "Authorization") String token,
                                     @RequestParam Long bookId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin.equals("admin"))
            adminService.increaseBookQuantity(bookId);
        else
            throw new Exception("Administration Page Only!");
    }

    @PutMapping("/secure/decrease/book/quantity")
    public void decreaseBookQuantity(@RequestHeader(value = "Authorization") String token,
                                     @RequestParam Long bookId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin.equals("admin"))
            adminService.decreaseBookQuantity(bookId);
        else
            throw new Exception("Administration Page Only!");
    }

    @PostMapping("/secure/add/book")
    public void addBook(@RequestHeader(value = "Authorization") String token,
                        @RequestBody AddBookRequest addBookRequest) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if (!admin.equals("admin") || admin == null)
            throw new Exception("Authorization Page Only!");

        adminService.postBook(addBookRequest);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader(value="Authorization") String token,
                           @RequestParam Long bookId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.deleteBook(bookId);
    }
}
