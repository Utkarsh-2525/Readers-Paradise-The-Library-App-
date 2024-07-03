package com.utkarsh2573.readersparadise.controller;

import com.utkarsh2573.readersparadise.RequestModels.ReviewRequest;
import com.utkarsh2573.readersparadise.RequestModels.ReviewService;
import com.utkarsh2573.readersparadise.entity.Review;
import com.utkarsh2573.readersparadise.utils.ExtractJWT;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/book")
    public boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token,
                                    @RequestParam Long bookId) throws Exception
    {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (userEmail == null)
            throw new Exception("User Email Missing");
        return reviewService.userReviewListed(userEmail, bookId);
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token, @RequestBody ReviewRequest reviewRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if (userEmail == null)
            throw new Exception("User Email is missing!");

        reviewService.postReview(userEmail, reviewRequest);
    }
}
