package com.utkarsh2573.readersparadise.dao;

import com.utkarsh2573.readersparadise.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByUserEmail(String UserEmail);
}
