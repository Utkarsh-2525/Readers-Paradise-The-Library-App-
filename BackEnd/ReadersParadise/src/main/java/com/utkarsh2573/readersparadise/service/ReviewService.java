package com.utkarsh2573.readersparadise.service;

import com.utkarsh2573.readersparadise.RequestModels.ReviewRequest;
import com.utkarsh2573.readersparadise.dao.ReviewRepository;
import com.utkarsh2573.readersparadise.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {

        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
        // check if review already exists
        if (validateReview != null)
            throw new Exception("Review already exists");

        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);

        // check if review has a description or not
        if (reviewRequest.getReviewDescription().isPresent())
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString) // save the description if review exists
                    .orElse(null)); // else save null

        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }
    public Boolean userReviewListed(String userEmail, Long bookId) throws Exception {
//        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        return reviewRepository.findByUserEmailAndBookId(userEmail, bookId) != null;
    }
}
