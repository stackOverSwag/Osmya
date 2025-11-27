package com.osmya.ecommerceapi.controller;

import com.osmya.ecommerceapi.model.Product;
import com.osmya.ecommerceapi.repository.ProductRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ProductGraphQLController {

    private final ProductRepository productRepository;

    public ProductGraphQLController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @QueryMapping
    public List<Product> products() {
        return productRepository.findAll();
    }

    @QueryMapping
    public Product product(@Argument Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
