
Feature: Login and shop negative and edge cases

  @Negative
  Scenario Outline: Login with invalid credentials shows error message
    Given I open the login page
    When I enter username "<UserName>" and password "<Password>"
    Then I should see a login error message
    Examples:
      | UserName                             | Password  |
      | test@test.com                        | wrongPass |

  @Negative
  Scenario: Search for non-existent product shows no products found message
    Given I am on the shop page
    When I search for a non-existent product item "somethingdifferent"
    Then I should see a no products found message is displayed
   
  @Edge 
  Scenario: Remove item from cart
    Given I am on the shop page
    And I open the first product details
    When I add the first product to the cart from its details page
    And I open the cart
    Then The cart shows the product with name, quantity and price
    When I delete the product from the cart
    Then The cart is empty
    And The system should display "The cart is empty. Nothing to display."


  
