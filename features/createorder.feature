Feature: Create Order on Practice Software Testing

  @Postive
  Scenario Outline: Create order with login and payment & confirmation
    Given I am on the shop page
    Then I see a list of products with names, images and prices
    And I open the first product details
    When I add the first product to the cart from its details page
    And I open the cart
    Then The cart shows the product with name, quantity and price
    When I proceed to checkout from the cart
    And I enter username "<UserName>" and password "<Password>"
    And I proceed to  billing Address After sign
    And I proceed with Billing Details "<StreetName>", "<City>", "<State>", "<Country>" and "<Postcode>" to payment
    When I complete payment with valid details
    And I should see an Payment confirmation
    Then I should see an order confirmation
    Examples:
      | UserName                              | Password   | StreetName         | City   | State    | Country       | Postcode |
      | customer@practicesoftwaretesting.com  | welcome01  | 123 Test Street    | Oxford | London   |United Kingdom | OX1 1TH  |