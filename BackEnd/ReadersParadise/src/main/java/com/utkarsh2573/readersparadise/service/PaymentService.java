package com.utkarsh2573.readersparadise.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.utkarsh2573.readersparadise.RequestModels.PaymentInfoRequest;
import com.utkarsh2573.readersparadise.dao.PaymentRepository;
import com.utkarsh2573.readersparadise.entity.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class PaymentService {
    private PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, @Value("${stripe.key.secret}") String stripeKey) {
        this.paymentRepository = paymentRepository;
        Stripe.apiKey = stripeKey;
    }

    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("cards");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfoRequest.getAmount());
        params.put("currency", paymentInfoRequest.getCurrency());
        params.put("paymentMethodType", paymentMethodTypes);

        return PaymentIntent.create(params);
    }

    public ResponseEntity<String> stripepayment(String userEmail) throws Exception {
        Payment payment = paymentRepository.findByUserEmail(userEmail);
        if (payment == null)
            throw new Exception("Payment Info missing!");
        payment.setAmount(00.00);
        paymentRepository.save(payment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
