Feature: Create tests for Bugs Site
@bugs-1
  Scenario: Incorrect navigation when clicking Home from Shop page
    Given I am on the shop page
    When I navigative to Home page
    Then The Home page should be displayed
@bugs-2
  Scenario: Quantity can be increased and decreased on product page
    Given I am on the shop page
    When I open the first product details
    When I increase quantity 
    Then The quantity should be greater than 1
  

     