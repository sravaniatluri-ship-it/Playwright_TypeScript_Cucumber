@api @brands
Feature: Brands API CRUD

  Scenario: GET brands returns list
    Given I have an API client
    When I request the list of brands
    Then the response status should be 200
    And the response should contain at least 1 brand

  Scenario: POST brand creates a brand
    Given I have an API client
    When I create a brand with name "AutoBrand"
    Then the response status should be 201
    And the created brand name should contain "AutoBrand"