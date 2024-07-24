package com.utkarsh2573.readersparadise.RequestModels;

import lombok.Data;

@Data
public class AddBookRequest {

    private String title;

    private String author;

    private String Description;

    private int copies;

    private String category;

    private String image;
}
