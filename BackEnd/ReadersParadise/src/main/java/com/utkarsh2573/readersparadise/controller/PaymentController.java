package com.utkarsh2573.readersparadise.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.utkarsh2573.readersparadise.RequestModels.PaymentInfoRequest;
import com.utkarsh2573.readersparadise.service.PaymentService;
import com.utkarsh2573.readersparadise.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/payment/secure")
public class PaymentController {
    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripepaymentComplete(@RequestHeader(value = "Authorization") String authorization) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(authorization, "\"sub\"");

        if (userEmail == null)
            throw new Exception("User Email missing!");

        return paymentService.stripepayment(userEmail);
    }
}
